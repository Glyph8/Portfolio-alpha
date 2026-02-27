import ReactMarkdown from "react-markdown";
import styles from "./PortfolioDetail.module.css";
import { README_CONTENT } from "./constant";
import { useLocation, useNavigate } from "react-router";
import { useProjects } from "../portfolio/projects/hooks/use-projects";
import Loading from "../../components/loading/Loading";
import NotFound from "../../components/error/NotFound";

export default function PortfolioDetail() {

  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const id = path.split("/").pop();

  const { projects, isLoading, isError } = useProjects();

  if (isLoading) {
    return <Loading />;
  }

  if (!projects || projects.length === 0 || isError) {
    return <NotFound />;
  }

  const project = projects.find((p) => p.project_id === Number(id));

  const handleBack = () => {
    navigate(-1);
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
              {project?.project_skills.map((ps) => (
                <li key={ps.skills.name}>{ps.skills.name}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.projectOverview}>
          <h2>프로젝트 슬로건</h2>
          <p>프로젝트 소개소개소개소개개개개개</p>

          <nav className={styles.techStacksContainer}>
            {
              project?.project_skills.map((ps) => {
                return (
                  <div className={styles.techStacksCard}>
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
        <ReactMarkdown>
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
