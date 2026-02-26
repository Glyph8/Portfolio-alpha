import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation(); 

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault(); 

    if (location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <div className={styles.header}>
      <h2 className={styles.title}>
        <a href="#home" onClick={(e) => handleNavClick(e, "home")}>My Portfolio</a>
      </h2>
      <nav className={styles.nav}>
        <ul>
          <li><a href="#about" onClick={(e) => handleNavClick(e, "about")}>about me</a></li>
          <li><a href="#portfolio" onClick={(e) => handleNavClick(e, "projects")}>projects</a></li>
          <li><a href="#skills" onClick={(e) => handleNavClick(e, "skills")}>skills</a></li>
          <li><a href="#timeline" onClick={(e) => handleNavClick(e, "timeline")}>time line</a></li>
        </ul>
      </nav>
    </div>
  );
}