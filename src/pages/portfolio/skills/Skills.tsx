import styles from "./Skills.module.css";
import languageIcon from "../../../assets/icons/Programming.png";
import frontendIcon from "../../../assets/icons/JavaScript.png";
import backendIcon from "../../../assets/icons/Stack.png";
import mobileIcon from "../../../assets/icons/Smartphone.png";
import devOpsIcon from "../../../assets/icons/Cloud Development.png";

export default function Skills() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Skills</h2>
      <div className={styles.skillsContainer}>

        <div className={styles.skillCategory}>
          <img src={languageIcon} alt="Skill Icon" className={styles.skillIcon} />
          <p className={styles.skillCategoryTitle}>Language</p>
          <div className={styles.skillChipsContainer}>
            <span className={styles.skillChip}>React</span>
            <span className={styles.skillChip}>TypeScript</span>
            <span className={styles.skillChip}>CSS</span>
            <span className={styles.skillChip}>React</span>
            <span className={styles.skillChip}>TypeScript</span>
            <span className={styles.skillChip}>CSS</span>
            <span className={styles.skillChip}>React</span>
            <span className={styles.skillChip}>TypeScript</span>
            <span className={styles.skillChip}>CSS</span>

          </div>
        </div>

        <div className={styles.skillCategory}>
          <img src={frontendIcon} alt="Skill Icon" className={styles.skillIcon} />
          <p className={styles.skillCategoryTitle}>Frontend</p>
          <div className={styles.skillChipsContainer}>
            <span className={styles.skillChip}>React</span>
            <span className={styles.skillChip}>TypeScript</span>
            <span className={styles.skillChip}>CSS</span>
            <span className={styles.skillChip}>React</span>
            <span className={styles.skillChip}>TypeScript</span>
            <span className={styles.skillChip}>CSS</span>
            <span className={styles.skillChip}>React</span>
            <span className={styles.skillChip}>TypeScript</span>
            <span className={styles.skillChip}>CSS</span>
            <span className={styles.skillChip}>React</span>
            <span className={styles.skillChip}>TypeScript</span>
            <span className={styles.skillChip}>CSS</span>
            <span className={styles.skillChip}>React</span>
            <span className={styles.skillChip}>TypeScript</span>
            <span className={styles.skillChip}>CSS</span>
          </div>
        </div>


        <div className={styles.skillCategory}>
          <img src={backendIcon} alt="Skill Icon" className={styles.skillIcon} />
          <p className={styles.skillCategoryTitle}>Backend</p>
          <div className={styles.skillChipsContainer}>
            <span className={styles.skillChip}>React</span>
            <span className={styles.skillChip}>TypeScript</span>
            <span className={styles.skillChip}>CSS</span>
            <span className={styles.skillChip}>React</span>
            <span className={styles.skillChip}>TypeScript</span>
            <span className={styles.skillChip}>CSS</span>
            <span className={styles.skillChip}>React</span>
            <span className={styles.skillChip}>TypeScript</span>
            <span className={styles.skillChip}>CSS</span>
            <span className={styles.skillChip}>React</span>
            <span className={styles.skillChip}>TypeScript</span>
            <span className={styles.skillChip}>CSS</span>
          </div>
        </div>


        <div className={styles.skillCategory}>
          <img src={mobileIcon} alt="Skill Icon" className={styles.skillIcon} />
          <p className={styles.skillCategoryTitle}>Mobile</p>
          <div className={styles.skillChipsContainer}>
            <span className={styles.skillChip}>React</span>
            <span className={styles.skillChip}>TypeScript</span>
            <span className={styles.skillChip}>CSS</span>
            <span className={styles.skillChip}>React</span>
            <span className={styles.skillChip}>TypeScript</span>
            <span className={styles.skillChip}>CSS</span>
            <span className={styles.skillChip}>React</span>
            <span className={styles.skillChip}>TypeScript</span>
            <span className={styles.skillChip}>CSS</span>
            <span className={styles.skillChip}>React</span>
            <span className={styles.skillChip}>TypeScript</span>
            <span className={styles.skillChip}>CSS</span>
            <span className={styles.skillChip}>React</span>
            <span className={styles.skillChip}>TypeScript</span>
            <span className={styles.skillChip}>CSS</span>
          </div>
        </div>

        <div className={styles.skillCategory}>
          <img src={devOpsIcon} alt="Skill Icon" className={styles.skillIcon} />
          <p className={styles.skillCategoryTitle}>devOps</p>
          <div className={styles.skillChipsContainer}>
            <span className={styles.skillChip}>React</span>
            <span className={styles.skillChip}>TypeScript</span>
            <span className={styles.skillChip}>CSS</span>
            <span className={styles.skillChip}>React</span>
            <span className={styles.skillChip}>TypeScript</span>
            <span className={styles.skillChip}>CSS</span>
            <span className={styles.skillChip}>React</span>
            <span className={styles.skillChip}>TypeScript</span>
            <span className={styles.skillChip}>CSS</span>
            <span className={styles.skillChip}>React</span>
            <span className={styles.skillChip}>TypeScript</span>
            <span className={styles.skillChip}>CSS</span>
            <span className={styles.skillChip}>React</span>
            <span className={styles.skillChip}>TypeScript</span>
            <span className={styles.skillChip}>CSS</span>
          </div>
        </div>

      </div>

    </div>
  );
}
