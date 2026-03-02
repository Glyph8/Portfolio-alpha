import { useState, useRef, useEffect } from "react";
import PortfolioLayout from "../portfolio-detail/layout/PortfolioLayout";
import styles from "./PortfolioPost.module.css";
import detailStyles from "../portfolio-detail/PortfolioDetail.module.css";
import { useSkillReasonScroll } from "../portfolio-detail/hooks/use-skill-reason-scroll";

export default function PortfolioPost() {
  const [title, setTitle] = useState("");
  const [role, setRole] = useState("");
  const [duration, setDuration] = useState("");
  const [contribution, setContribution] = useState("");
  const [slogan, setSlogan] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [readme, setReadme] = useState("");
  const [skills, setSkills] = useState<{ name: string; skill_reason: string }[]>([]);

  const [newSkillName, setNewSkillName] = useState("");

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const {
    maskState, activeIndex, onDragStart, onDragEnd, onDragMove, handleScroll, handleSkillClick
  } = useSkillReasonScroll(scrollRef);

  useEffect(() => {
    handleScroll();
  }, [skills]);

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;
    setSkills([...skills, { name: newSkillName.trim(), skill_reason: "" }]);
    setNewSkillName("");
  };

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSkillReasonChange = (index: number, reason: string) => {
    const newSkills = [...skills];
    newSkills[index].skill_reason = reason;
    setSkills(newSkills);
  };

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
          <h2>사용 기술 스택 (추가)</h2>
          <ul>
            {skills.map((skill, index) => (
              <li key={skill.name}
                className={activeIndex === index ? detailStyles.activeSkill : undefined}
                onClick={() => handleSkillClick(index)}
                style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "0.4rem" }}
              >
                {skill.name}
                <button type="button" className={styles.removeBtn} onClick={(e) => { e.stopPropagation(); handleRemoveSkill(index); }}>&times;</button>
              </li>
            ))}
          </ul>
          <div className={styles.skillInputWrapper}>
            <input
              type="text"
              className={styles.inputElement}
              placeholder="기술 스택 입력 (ex: React)"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleAddSkill(); }}
            />
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
              placeholder="프로젝트 짧은 슬로건을 입력하세요"
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
                <div className={styles.techStacksCard} key={skill.name}>
                  <div className={detailStyles.techStacksCardTitle}>
                    {skill.name}
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
          <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)' }}>마크다운(Markdown) 형식으로 지원합니다. 프로젝트 상세 내용, 트러블 슈팅 경험 등을 기록해보세요.</p>
          <textarea
            className={`${styles.textareaElement} ${styles.readmeTextarea}`}
            placeholder="# 프로젝트 이름&#13;&#10;&#13;&#10;## 트러블 슈팅&#13;&#10;... 블록체인에서 겪었던 동시성 이슈를 이런 식으로 해결했습니다 ..."
            value={readme}
            onChange={(e) => setReadme(e.target.value)}
          />
        </div>
      }

      actionSlot={
        <>
          <button type="button">
            작성 취소
          </button>
          <button type="button">
            포트폴리오 게시
          </button>
        </>
      }
    />
  )
}
