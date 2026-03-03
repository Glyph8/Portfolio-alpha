import ReactMarkdown from "react-markdown";
import styles from "./PortfolioDetail.module.css";
import { README_CONTENT } from "./constant";
import { useLocation, useNavigate } from "react-router";
import { useProjects } from "../portfolio/projects/hooks/use-projects";
import Loading from "../../components/loading/Loading";
import NotFound from "../../components/error/NotFound";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useEffect, useRef } from "react";
import { useSkillReasonScroll } from "./hooks/use-skill-reason-scroll";
import PortfolioLayout from "./layout/PortfolioLayout";
import layoutStyles from "./layout/PortfolioLayout.module.css";

export default function PortfolioDetail() {

  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const id = path.split("/").pop();

  const { projects, isLoading, isError } = useProjects();

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const {
    maskState, activeIndex, onDragStart, onDragEnd, onDragMove, handleScroll, handleSkillClick
  } = useSkillReasonScroll(scrollRef);

  const project = projects?.find((p) => p.project_id === Number(id));

  const handleBack = () => {
    navigate(-1);
  }

  const handleEdit = () => {
    if (!project) return;
    navigate("/projects/new", { state: { projectId: project.project_id } });
  }

  useEffect(() => {
    handleScroll();
  }, [project]);

  if (isLoading) {
    return <Loading />;
  }

  if (!project || isError) {
    return <NotFound />;
  }


  return (
    <PortfolioLayout
      titleSlot={<h1>{project?.title}</h1>}

      infoSlot={
        <>
          <h2>프로젝트 정보</h2>
          <p>역할: {project?.role}</p>
          <p>기간: {project?.duration}</p>
          <p>기여도: {project?.contribution}</p>
        </>
      }

      skillsSlot={
        <ul>
          {project?.project_skills.map((ps, index) => (
            <li key={ps.skills.name}
              className={activeIndex === index ? layoutStyles.activeSkill : undefined}
              onClick={() => handleSkillClick(index)}
              style={{ cursor: "pointer" }}
            >{ps.skills.name}</li>
          ))}
        </ul>
      }

      overviewSlot={
        // 기존 슬로건, 소개, 그리고 드래그 스크롤되는 스킬 카드 리스트
        <>
          <div className={styles.projectOverviewContent}>
            <h2 className={styles.projectSlogan}>{project.slogan}</h2>
            <p className={styles.projectIntroduction}>{project.introduction}</p>
          </div>

          <nav className={`${styles.techStacksContainer} ${maskState === 'right' ? styles.maskRight :
            maskState === 'left' ? styles.maskLeft :
              maskState === 'both' ? styles.maskBoth : ''
            }`}
            ref={scrollRef}
            onMouseDown={onDragStart}
            onMouseLeave={onDragEnd}
            onMouseUp={onDragEnd}
            onMouseMove={onDragMove}
            onScroll={handleScroll}
          >
            {
              project?.project_skills.map((ps) => {
                return (
                  <div className={styles.techStacksCard} key={ps.skills.name}>
                    <div className={styles.techStacksCardTitle}>
                      {ps.skills.name}
                    </div>
                    <p className={styles.techStacksCardDescription}>
                      {ps.skill_reason}
                    </p>
                  </div>
                )
              })
            }
          </nav>
        </>
      }

      readmeSlot={
        <div className={styles.readmeContent}>
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {project?.readme || README_CONTENT}
          </ReactMarkdown>
        </div>
      }

      actionSlot={
        <>
          <button className={styles.backBtn}
          onClick={handleBack}>
            목록으로
          </button>
          <button className={styles.editBtn} onClick={handleEdit}>
            수정하기
          </button>
          <button className={styles.deleteBtn}>
            삭제하기
          </button>
        </>
      }
    />
  );

}
