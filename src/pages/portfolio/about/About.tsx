import styles from "./About.module.css";

export default function About() {
  return (
    <div className={styles.container}>
      <div className={styles.intro}>
        <h2 className={styles.title}> 프론트엔드 개발자. 강동윤입니다.</h2>
        <p className={styles.description}> 룰루랄라 룰루랄라 </p>
      </div>
      <div className={styles.myInfo}>
        <img src="https://placehold.co/300x300" alt="Portrait" className={styles.portrait} />
        
        
        <div className={styles.name}>
          Hi, I'm John Doe
          <nav>
            <ul className={styles.socialLinks}>
              <li><a href="https://github.com/johndoe" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://linkedin.com/in/johndoe" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="https://twitter.com/johndoe" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            </ul>
          </nav>
        </div>
        
        <div className={styles.connectInfo}>
          <p> 010 1234 5567 </p>
          <p>john.doe@example.com</p>
          <p>2000.08.08</p>
          <p>~대 ~과 졸업</p>
        </div>

      </div>
    </div>
  );
}
