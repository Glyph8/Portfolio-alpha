import { useEffect } from "react";
import ProjectCard from "./components/ProjectCard";
import styles from "./Projects.module.css";
import { useLocation } from "react-router-dom";

export default function Projects() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace('#', '');
      const element = document.getElementById(elementId);
      
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]); 
  

  return <div className={styles.container}>

    <h2 className={styles.title}>Projects</h2>

    <nav>
      <ul className={styles.navList}>
        <li className={`${styles.navItem} ${styles.activeNavItem}`}>All</li>
        <li className={styles.navItem}>Frontend</li>
        <li className={styles.navItem}>Mobile</li>
        <li className={styles.navItem}>Backend</li>
      </ul>
    </nav>

    <div className={styles.projectGrid}>
      <ProjectCard id={0} title={"My First Project"} description={"This is a sample project description."} imageUrl={"https://placehold.co/600x400/png"} skillChips={["React", "TypeScript"]} projectUrl={"123"} githubUrl={"123"} />
      <ProjectCard id={0} title={"My First Project"} description={"This is a sample project description."} imageUrl={"https://placehold.co/600x400/png"} skillChips={["React", "TypeScript"]} projectUrl={"123"} githubUrl={"123"} />
      <ProjectCard id={0} title={"My First Project"} description={"This is a sample project description."} imageUrl={"https://placehold.co/600x400/png"} skillChips={["React", "TypeScript"]} projectUrl={"123"} githubUrl={"123"} />
      <ProjectCard id={0} title={"My First Project"} description={"This is a sample project description."} imageUrl={"https://placehold.co/600x400/png"} skillChips={["React", "TypeScript"]} projectUrl={"123"} githubUrl={"123"} />
      <ProjectCard id={0} title={"My First Project"} description={"This is a sample project description."} imageUrl={"https://placehold.co/600x400/png"} skillChips={["React", "TypeScript"]} projectUrl={"123"} githubUrl={"123"} />
    </div>


  </div>;
}
