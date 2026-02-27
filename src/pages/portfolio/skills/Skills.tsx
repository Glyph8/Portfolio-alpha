import styles from "./Skills.module.css";

import { SKILLS } from "./contants";
import { useProjects } from "../projects/hooks/use-projects";
import Loading from "../../../Loading";

interface CategorySkills {
  category: string;
  icons: string;
  skills: string[];
}

export default function Skills() {

  const {projects, isLoading, isError, error } = useProjects();
  
  console.log(projects, isLoading, isError, error);

  const skillData: CategorySkills[] = SKILLS;

  // 각 프로젝트의 project_skills를 순회.
  // 각 skill 마다의 categories를 읽고, 만약 추가되지 않은 category라면 skillData에 추가
  // 그리고 해당 category에 skill들을 추가.
  // 최종적으로 category 별로 해당되는 skill들이 담겨야 한다.
  // category 예시: { category: "Frontend", skills: ["React", "Vue", ...] }

  projects?.forEach(project => {
    project.project_skills.forEach(ps => {
      ps.skills.category_skills.forEach(cs => {
        const categoryName = cs.categories.categoryname;
        const skillName = ps.skills.name;
        const existingCategory = skillData.find(cat => cat.category === categoryName);
        if (existingCategory) {
          existingCategory.skills.push(skillName);
        } 
      })
    })
  })

  if(isLoading) {
    return <Loading/>;
  }

  if(isError) {
    return <div className="p-8 text-center text-red-500">에러가 발생했습니다: {error?.message}</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Skills</h2>
      <div className={styles.skillsContainer}>

      {
        skillData.map((skillCategory) => (
          <div key={skillCategory.category} className={styles.skillCategory}>
            <img src={skillCategory.icons} alt="Skill Icon" className={styles.skillIcon} />
            <p className={styles.skillCategoryTitle}>{skillCategory.category}</p>
            <div className={styles.skillChipsContainer}>
              {
                skillCategory.skills.map((skillName) => (
                  <span key={skillName} className={styles.skillChip}>{skillName}</span>
                ))
              }
            </div>
          </div>
        ))
      }

      </div>
    </div>
  );
}
