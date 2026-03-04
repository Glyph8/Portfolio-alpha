import styles from "./About.module.css";
import instagLogo from "../../../assets/icons/ic_insta.svg";
import githubLogo from "../../../assets/icons/ic_github.svg";
import linkedInLogo from "../../../assets/icons/ic_linkedIn.svg";
import phone from "../../../assets/icons/ic_phone.svg";
import email from "../../../assets/icons/ic_mail.svg";
import birth from "../../../assets/icons/ic_calendar.svg";
import graduation from "../../../assets/icons/ic_school.svg";


export default function About() {
  return (
    <div className={styles.container}>
      <div className={styles.intro}>
        <h2 className={styles.title}> 보안을 중시하는 프론트엔드 개발자. 강동윤입니다.</h2>
        <p className={styles.description}> 수많은 서비스와 기능들 속에서도 항상 사용자의 보안을 지키는, 쾌적한 UX를 만들고자 합니다. </p>
      </div>
      <div className={styles.myInfo}>
        <img src="https://dfqhlgqbzkbkeahqdmog.supabase.co/storage/v1/object/public/blog-images/my_img.jpg" alt="Portrait" className={styles.portrait} />


        <div className={styles.about}>
          <nav className={styles.nav}>
            <p className={styles.name}>강동윤</p>
            <button className={styles.button}>
              <img src={instagLogo} alt="Instagram" />
            </button>
            <button className={styles.button}>
              <img src={githubLogo} alt="GitHub" style={{
                backgroundColor: 'white',
                borderRadius: '50%'
              }} />
            </button>
            <button className={styles.button}>
              <img src={linkedInLogo} alt="LinkedIn" />
            </button>
          </nav>

          <div className={styles.connectInfo}>
            <span className={styles.contactItem}>
              <img src={phone} alt="Phone" /> 010-4713-9384 </span>
            <span className={styles.contactItem}>
              <img src={email} alt="Email" /> newdy0808@gmail.com</span>
            <span className={styles.contactItem}>
              <img src={birth} alt="Birth" /> 2000.08.08</span>
            <span className={styles.contactItem}>
              <img src={graduation} alt="Graduation" /> 건국대 소프트웨어학과 졸업</span>
          </div>
        </div>

      </div>
    </div>
  );
}
