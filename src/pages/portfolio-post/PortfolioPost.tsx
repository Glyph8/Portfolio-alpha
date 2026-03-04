import { useState, useRef, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import PortfolioLayout from "../portfolio-detail/layout/PortfolioLayout";
import styles from "./PortfolioPost.module.css";
import detailStyles from "../portfolio-detail/PortfolioDetail.module.css";
import layoutStyles from "../portfolio-detail/layout/PortfolioLayout.module.css";
import { useSkillReasonScroll } from "../portfolio-detail/hooks/use-skill-reason-scroll";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { createProject, updateProject } from "../../apis/portfolio-api";
import { useSkillOptions } from "./hooks/use-skill-option";
import { CATEGORY_MAP, CATEGORY_OPTIONS } from "./constants";
import { useProject } from "../portfolio/projects/hooks/use-projects";
import Loading from "../../components/loading/Loading";
import NotFound from "../../components/error/NotFound";

interface Skill {
  isNew: boolean;
  name: string;
  category: string;
  category_id?: number;
  skill_id?: number;
  skill_reason: string;
}


export default function PortfolioPost() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();
  const location = useLocation();
  const projectId = id ? Number(id) : undefined;
  const locationState = location.state as { projectId?: number } | null;
  const derivedProjectId = projectId ?? locationState?.projectId;
  const resolvedProjectId = typeof derivedProjectId === "number" ? derivedProjectId : undefined;
  const isEditMode = resolvedProjectId !== undefined;

  const { data: targetProject, isLoading: isProjectLoading, isError: isProjectError } = useProject(resolvedProjectId);

  const [title, setTitle] = useState("");
  const [role, setRole] = useState("");
  const [duration, setDuration] = useState("");
  const [contribution, setContribution] = useState("");
  const [slogan, setSlogan] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isFormInitialized, setIsFormInitialized] = useState(!isEditMode);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newSkillName, setNewSkillName] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");


  const { skillOptions } = useSkillOptions();

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const {
    maskState, activeIndex, onDragStart, onDragEnd, onDragMove, handleScroll, handleSkillClick
  } = useSkillReasonScroll(scrollRef);

  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "heading",
        content: "프로젝트 이름",
      },
      {
        type: "paragraph",
        content: "프로젝트에 대한 간략한 설명을 작성하세요.",
      },
      {
        type: "heading",
        props: { level: 2 },
        content: "트러블 슈팅 경험",
      },
      {
        type: "paragraph",
        content: "프로젝트 진행 중 겪었던 어려움과 해결 방법을 기록해보세요. ('/'를 누르면 메뉴가 나옵니다)",
      },
    ]
  });

  useEffect(() => {
    if (!isEditMode || !targetProject || isFormInitialized) return;

    let isCancelled = false;

    const initializeForm = async () => {
      setTitle(targetProject.title ?? "");
      setRole(targetProject.role ?? "");
      setDuration(targetProject.duration ?? "");
      setContribution(targetProject.contribution ?? "");
      setSlogan(targetProject.slogan ?? "");
      setIntroduction(targetProject.introduction ?? targetProject.overview ?? "");

      const formattedSkills = (targetProject.project_skills ?? []).map((ps) => {
        const rawCategoryName = ps.skills.category_skills?.[0]?.categories?.categoryname ?? "";
        const matchedCategory = CATEGORY_OPTIONS.find((category) => category === rawCategoryName);

        return {
          isNew: false,
          name: ps.skills.name,
          category: rawCategoryName || matchedCategory || "Uncategorized",
          category_id: matchedCategory ? CATEGORY_MAP[matchedCategory] : undefined,
          skill_id: ps.skill_id,
          skill_reason: ps.skill_reason ?? "",
        };
      });

      setSkills(formattedSkills);

      try {
        const markdown = targetProject.readme ?? "";
        const blocks = await editor.tryParseMarkdownToBlocks(markdown);
        if (!isCancelled) {
          editor.replaceBlocks(editor.document, blocks);
        }
      } catch (error) {
        console.error("README 초기화에 실패했습니다:", error);
      } finally {
        if (!isCancelled) {
          setIsFormInitialized(true);
        }
      }
    };

    initializeForm();

    return () => {
      isCancelled = true;
    };
  }, [editor, isEditMode, targetProject, isFormInitialized]);

  useEffect(() => {
    handleScroll();
  }, [skills, handleScroll]);

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;

    const matched = skillOptions.find(
      (s) => s.skill_name.toLowerCase() === newSkillName.trim().toLowerCase()
    );

    if (matched) {
      setSkills((prev) => [...prev, {
        name: matched.skill_name,
        category: matched.category_name,
        category_id: matched.category_id,
        skill_reason: "",
        isNew: false,
        skill_id: matched.skill_id,
      }]);
    } else {
      if (!newCategoryName) return;
      setSkills((prev) => [...prev, {
        name: newSkillName.trim(),
        category: newCategoryName,
        category_id: CATEGORY_MAP[newCategoryName as keyof typeof CATEGORY_MAP],
        skill_reason: "",
        isNew: true,
      }]);
    }

    setNewSkillName("");
    setNewCategoryName("");
  };

  const handleSkillNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewSkillName(value);

    const matched = skillOptions.find(
      (s) => s.skill_name.toLowerCase() === value.toLowerCase()
    );

    if (matched) {
      setTimeout(() => {
        setNewCategoryName(matched.category_name);
      }, 0);
    } else {
      setNewCategoryName("");
    }
  };

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSkillReasonChange = (index: number, reason: string) => {
    const newSkills = [...skills];
    newSkills[index].skill_reason = reason;
    setSkills(newSkills);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const projectData = {
        title,
        slug: title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        role,
        duration,
        contribution,
        slogan,
        overview: introduction,
        introduction,
        readme: await editor.blocksToMarkdownLossy(editor.document),
        project_skills: skills.map((skill) => ({
          isNew: skill.isNew,
          name: skill.name,
          skill_reason: skill.skill_reason,
          ...(skill.category_id !== undefined ? { category_id: skill.category_id } : {}),
          ...(skill.skill_id !== undefined ? { skill_id: skill.skill_id } : {}),
        })),
      };

      if (resolvedProjectId) {
        await updateProject(resolvedProjectId, projectData);
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ['projects'] }),
          queryClient.invalidateQueries({ queryKey: ['project', resolvedProjectId] })
        ]);
      } else {
        await createProject(projectData);
        await queryClient.invalidateQueries({ queryKey: ['projects'] });
      }

      navigate(-1);
    } catch (error) {
      console.error("프로젝트 저장에 실패했습니다:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelBtn = () => {
    navigate(-1);
  }

  if (isEditMode) {
    if (isProjectLoading) {
      return <Loading />;
    }

    if (isProjectError || !targetProject) {
      return <NotFound />;
    }

    if (!isFormInitialized) {
      return <Loading />;
    }
  }

  return (
    <PortfolioLayout
      titleSlot={
        <input
          type="text"
          className={`${styles.inputElement} ${styles.titleInput}`}
          placeholder="프로젝트 제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      }

      infoSlot={
        <div className={styles.infoFormContainer}>
          <h2>프로젝트 정보 (입력)</h2>
          <div className={styles.formGroup}>
            <label>역할:</label>
            <input type="text" className={styles.inputElement} placeholder="ex) Frontend, Backend..." value={role} onChange={(e) => setRole(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label>기간:</label>
            <input type="text" className={styles.inputElement} placeholder="ex) 2023.01 ~ 2023.06" value={duration} onChange={(e) => setDuration(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label>기여도:</label>
            <input type="text" className={styles.inputElement} placeholder="ex) 100%" value={contribution} onChange={(e) => setContribution(e.target.value)} />
          </div>
        </div>
      }

      skillsSlot={
        <div className={styles.skillsFormContainer}>
          <h2>사용 기술 스택 & 카테고리 (추가)</h2>
          <ul>
            {skills.map((skill, index) => (
              <li key={`${skill.name}-${index}`}
                className={activeIndex === index ? layoutStyles.activeSkill : undefined}
                onClick={() => handleSkillClick(index)}
                style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "0.4rem" }}
              >
                {skill.name}
                <button type="button" className={styles.removeBtn} onClick={(e) => { e.stopPropagation(); handleRemoveSkill(index); }}>&times;</button>
              </li>
            ))}
          </ul>
          <div className={styles.skillInputWrapper}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <input
                type="text"
                className={styles.inputElement}
                placeholder="기술 스택 입력 (ex: React)"
                value={newSkillName}
                onChange={handleSkillNameChange}
                list="skill-suggestions"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newSkillName.trim() && newCategoryName) {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
              />
              <datalist id="skill-suggestions">
                {skillOptions.map((skill) => (
                  <option key={skill.skill_id} value={skill.skill_name} />
                ))}
              </datalist>

              <select
                className={`${styles.inputElement} ${styles.selectElement}`}
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              >
                <option value="">기술 카테고리 선택</option>
                {CATEGORY_OPTIONS.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <button type="button" className={styles.addBtn} onClick={handleAddSkill}>추가</button>
          </div>
        </div>
      }

      overviewSlot={
        <>
          <div className={styles.overviewFormContainer}>
            <input
              type="text"
              className={`${styles.inputElement} ${styles.sloganInput}`}
              placeholder="짧은 프로젝트 슬로건을 입력하세요"
              value={slogan}
              onChange={(e) => setSlogan(e.target.value)}
            />
            <textarea
              className={styles.textareaElement}
              placeholder="프로젝트 상세 소개를 입력하세요"
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
            />
          </div>

          {skills.length > 0 && (
            <nav className={`${detailStyles.techStacksContainer} ${maskState === 'right' ? detailStyles.maskRight :
              maskState === 'left' ? detailStyles.maskLeft :
                maskState === 'both' ? detailStyles.maskBoth : ''
              }`}
              style={{ marginTop: '2.4rem' }}
              ref={scrollRef}
              onMouseDown={onDragStart}
              onMouseLeave={onDragEnd}
              onMouseUp={onDragEnd}
              onMouseMove={onDragMove}
              onScroll={handleScroll}
            >
              {skills.map((skill, index) => (
                <div className={styles.techStacksCard} key={`${skill.name}-${index}`}>
                  <div className={detailStyles.techStacksCardTitle}>
                    {skill.name} <span style={{ fontSize: "1.6rem", color: "var(--color-slate-400)" }}>{skill.category}</span>
                  </div>
                  <textarea
                    className={styles.skillReasonTextarea}
                    placeholder={`${skill.name} 기술 채택 이유나 프로젝트에서의 활용에 대해 서술하세요.`}
                    value={skill.skill_reason}
                    onChange={(e) => handleSkillReasonChange(index, e.target.value)}
                    onMouseDown={(e) => e.stopPropagation()} // 드래그 이벤트 중복 방지
                  />
                </div>
              ))}
            </nav>
          )}
        </>
      }

      readmeSlot={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>README 작성</h2>
          <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)' }}>
            노션처럼 편하게 작성하세요. `/` 키를 누르면 제목, 리스트, 코드 블록 등을 추가할 수 있습니다.
          </p>

          <div className={styles.editorWrapper} style={{ border: "1px solid var(--border-color)", borderRadius: "8px", padding: "1rem" }}>
            <BlockNoteView editor={editor} theme="light" />
          </div>
        </div>
      }

      actionSlot={
        <>
          <button type="button" onClick={handleCancelBtn}
            className={styles.cancelBtn}>
            작성 취소
          </button>
          <button type="button" onClick={handleSubmit}
            className={styles.submitBtn} disabled={isSubmitting}>
            {isEditMode ? "포트폴리오 수정" : "포트폴리오 게시"}
          </button>
        </>
      }
    />
  )
}
