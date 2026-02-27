import { useNavigate } from 'react-router-dom'; // 혹은 Next.js의 경우 next/link 사용
import styles from './NotFound.module.css';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className={styles.container}>
      <h1 className={styles.errorCode}>404</h1>
      <h2 className={styles.title}>페이지를 찾을 수 없습니다</h2>
      <p className={styles.description}>
        요청하신 페이지가 사라졌거나, 잘못된 경로입니다. <br />
        입력하신 주소가 정확한지 다시 한번 확인해 주세요.
      </p>
      <button 
        className={styles.homeButton} 
        onClick={() => navigate('/')}
        type="button"
      >
        홈으로 돌아가기
      </button>
    </main>
  );
}