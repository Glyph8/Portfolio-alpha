import ReactMarkdown from "react-markdown";
import styles from "./PortfolioDetail.module.css";
import { README_CONTENT } from "./constant";
import { useLocation, useNavigate } from "react-router";
import { useProjects } from "../portfolio/projects/hooks/use-projects";
import Loading from "../../components/loading/Loading";
import NotFound from "../../components/error/NotFound";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useEffect, useRef, useState } from "react";

export default function PortfolioDetail() {

  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  const id = path.split("/").pop();

  const { projects, isLoading, isError } = useProjects();

  const scrollRef = useRef<HTMLDivElement>(null);
  const [maskState, setMaskState] = useState('right');

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onDragStart = (e: React.MouseEvent) => {
    isDragging.current = true;
    if (!scrollRef.current) return;

    scrollRef.current.style.scrollSnapType = 'none';
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const onDragEnd = () => {
    isDragging.current = false;
    if (!scrollRef.current) return;
    scrollRef.current.style.scrollSnapType = 'x proximity';
  }

  const onDragMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // 드래그 속도 조절
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

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

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

    const isAtStart = scrollLeft <= 0;
    // 오차 범위를 위해 -1 정도 여유를 줍니다.
    const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 1;

    if (isAtStart) setMaskState('right');
    else if (isAtEnd) setMaskState('left');
    else setMaskState('both'); // 중간에 있을 때
  };

  // 컴포넌트가 처음 켜졌을 때 길이를 계산해서 상태 초기화
  useEffect(() => {
    handleScroll();
  }, [project]);

  const handleSkillClick = (index: number) => {
    if (!scrollRef.current) return;
    const targetCard = scrollRef.current.children[index] as HTMLElement;

    if (targetCard) {
      scrollRef.current.scrollTo({
        left: targetCard.offsetLeft - scrollRef.current.offsetLeft,
        behavior: "smooth"
      })
    }
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
                  onClick={() => handleSkillClick(index)}
                  style={{ cursor: "pointer" }}
                >{ps.skills.name}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.projectOverview}>
          <div>
            <h2>프로젝트 슬로건</h2>
            <p>프로젝트 소개소개소개소개개개개개</p>
          </div>

          <nav className={`${styles.techStacksContainer} ${maskState === 'right' ? styles.maskRight :
              maskState === 'left' ? styles.maskLeft :
                maskState === 'both' ? styles.maskBoth : ''
            }`}
            ref={scrollRef}
            onMouseDown={onDragStart}
            onMouseLeave={onDragEnd} // 마우스가 영역을 벗어나면 드래그 종료
            onMouseUp={onDragEnd}    // 클릭을 떼면 드래그 종료
            onMouseMove={onDragMove}
            onScroll={handleScroll}
          >
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
