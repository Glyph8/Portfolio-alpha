import { use, useEffect, useState } from "react";
import ProjectCard from "./components/ProjectCard";
import styles from "./Projects.module.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function Projects() {
  const location = useLocation();
  const navigate = useNavigate();

  const [categories, setCategories] = useState(["All", "Frontend", "Mobile", "Backend"]);

  const isLogin = true;

  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace('#', '');
      const element = document.getElementById(elementId);

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const handlePostProject = () => {
    if(isLogin){
      navigate("/projects/new");
    }
    else{
      navigate("/login");
    }
  };

  return <div className={styles.container}>

    <h2 className={styles.title}>Projects 
      <button onClick={handlePostProject} className={styles.postButton}>+</button></h2>

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
