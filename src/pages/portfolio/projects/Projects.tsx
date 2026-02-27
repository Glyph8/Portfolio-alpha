import { useState } from "react";
import ProjectCard from "./components/ProjectCard";
import styles from "./Projects.module.css";
import { useNavigate } from "react-router-dom";
import type { Category } from "../../../types/projec-type";
import { useProjects } from "./hooks/use-projects";
import Loading from "../../../components/loading/Loading";
import Login from "../../../components/dialog/Login";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store/store";


export default function Projects() {
  const navigate = useNavigate();

  const [category, setCategory] = useState<Category>("All");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const {projectsOverview, isLoading, isError, error } = useProjects();

  const filteredProjects = category === "All"
    ?  projectsOverview
    :  projectsOverview?.filter(project => project.category === category);

  const {isLoggedIn} = useSelector((state: RootState) => state.auth);

  const handlePostProject = () => {
    if (isLoggedIn) {
      navigate("/projects/new");
    }
    else {
      setIsLoginOpen(true);
    }
  };

  const handleSetFilter = (category: Category) => {
    setCategory(category);
  }

  if (isLoading) {
    return <Loading/>;
  }

  if (isError) {
    return <div className="p-8 text-center text-red-500">에러가 발생했습니다: {error?.message}</div>;
  }

  return <div className={styles.container}>
      {
        isLoginOpen && <Login isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />
      }

    <h2 className={styles.title}>Projects
      <button onClick={handlePostProject} className={styles.postButton}>+</button></h2>

    <nav>
      <ul className={styles.navList}>
        <li className={`${styles.navItem} ${category === "All" ? styles.activeNavItem : ""}`}
          onClick={() => handleSetFilter("All")}>All</li>
        <li className={`${styles.navItem} ${category === "Frontend" ? styles.activeNavItem : ""}`} onClick={() => handleSetFilter("Frontend")}>Frontend</li>
        <li className={`${styles.navItem} ${category === "Mobile" ? styles.activeNavItem : ""}`} onClick={() => handleSetFilter("Mobile")}>Mobile</li>
        <li className={`${styles.navItem} ${category === "Backend" ? styles.activeNavItem : ""}`} onClick={() => handleSetFilter("Backend")}>Backend</li>
      </ul>
    </nav>

    <div className={styles.projectGrid}>
      {
        filteredProjects && 
        filteredProjects.map(project => (
          <ProjectCard key={project.id} {...project} />
        ))
      }
    </div>


  </div>;
}
