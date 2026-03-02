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
    <div className={styles.container}>
      <h1 className={styles.title}>{project?.title}</h1>

      <section className={styles.projectHeader}>

        <div className={styles.projectInfo}>
          <div className={styles.projectInfoItem}>
            <h2>프로젝트 정보</h2>
            <p>역할: {project?.role}</p>
            <p>기간: {project?.duration}</p>
            <p>기여도: {project?.contribution}</p>
          </div>

          <div className={styles.techStacks}>
            <h2>사용 기술 스택</h2>
            <ul>
              {project?.project_skills.map((ps, index) => (
                <li key={ps.skills.name}
                  className={activeIndex === index ? styles.activeSkill : undefined}
                  onClick={() => handleSkillClick(index)}
                  style={{ cursor: "pointer" }}
                >{ps.skills.name}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.projectOverview}>
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
        </div>

      </section>

      <div className={styles.readme}>
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {project?.readme || README_CONTENT}
        </ReactMarkdown>
      </div>

      <nav className={styles.actions}>
        <button onClick={handleBack}>
          목록으로
        </button>
        <button>
          수정하기
        </button>
        <button>
          삭제하기
        </button>
      </nav>

    </div>
  )
}
