import ReactMarkdown from "react-markdown";
import styles from "./PortfolioDetail.module.css";
import { README_CONTENT } from "./constant";

export default function PortfolioDetail() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>포트폴리오 상세 페이지</h1>

      <div className={styles.projectInfo}>
        <div className={styles.projectInfoItem}>
          <h2>프로젝트 정보</h2>
          <p>역할: 프론트엔드 개발자</p>
          <p>기간: 2023.01 ~ 2023.06</p>
          <p>기여도: 70%</p>
        </div>
        <div className={styles.techStacks}>
          <h2>사용 기술 스택</h2>
          <ul>
            <li>React</li>
            <li>TypeScript</li>
            <li>CSS Modules</li>
          </ul>
        </div>
      </div>

      <div className={styles.readme}>
        <ReactMarkdown>
        {README_CONTENT}
        </ReactMarkdown>
      </div>

      <nav className={styles.actions}>
        <button>
          목록으로
        </button>
        <button>
          수정하기
        </button>
      </nav>

    </div>
  )
}
