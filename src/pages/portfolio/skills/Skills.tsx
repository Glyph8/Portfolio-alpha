import styles from "./Skills.module.css";

export default function Skills() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Skills</h2>
      <div className={styles.skillsContainer}>
        <div>
          <div className={styles.skill}>JavaScript</div>
          <div className={styles.skill}>React</div>
          <div className={styles.skill}>TypeScript</div>
          <div className={styles.skill}>CSS</div>
          <div className={styles.skill}>HTML</div>
        </div>
      </div>
    </div>
  );
}
