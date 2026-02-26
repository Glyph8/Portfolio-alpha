import { useEffect, useState } from "react";
import ProjectCard from "./components/ProjectCard";
import styles from "./Projects.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchProjects } from "../../../apis/portfolio-api";
import { useQuery } from "@tanstack/react-query";


export default function Projects() {
  const location = useLocation();
  const navigate = useNavigate();

  const [category, setCategory] = useState<Category>(CATEGORIES[0]);


  const { data: projects, isLoading, isError, error } = useQuery({
    queryKey: ['projects'], 
    queryFn: fetchProjects, 
  });


  // const filteredProjects = category === "All"
  //   ? PROJECT_LIST
  //   : PROJECT_LIST.filter(project => project.category === category);

  const filteredProjects = category === "All"
    ? projects
    : projects?.filter(project => project.category === category);

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
    if (isLogin) {
      navigate("/projects/new");
    }
    else {
      navigate("/login");
    }
  };

  const handleSetFilter = (category: Category) => {
    setCategory(category);
  }

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">프로젝트를 불러오는 중입니다...</div>;
  }

  if (isError) {
    return <div className="p-8 text-center text-red-500">에러가 발생했습니다: {error.message}</div>;
  }

  return <div className={styles.container}>

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
