import styles from './Loading.module.css';

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner} aria-label="로딩 중" />
      <p className={styles.text}>데이터를 불러오는 중입니다...</p>
    </div>
  );
}