import { supabase } from "../libs/supabaseClient";
import type { Category, ProjectCardProps, RawProject } from "../types/projec-type";

export const fetchAndTransformProjects = async (): Promise<ProjectCardProps[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      project_skills (
        skill_reason,
        skills (
          name,
          category_skills (
            categories (
              categoryname
            )
          )
        )
      )
    `);

  if (error) {
    throw new Error(error.message);
  }

  const rawProjects = data as RawProject[];

  return rawProjects.map((project) => {
    const skillChips = project.project_skills.map((ps) => ps.skills.name);

    // 프로젝트에 쓰인 스킬들의 카테고리를 모두 모아서 개수 카운트.
    const categoryCounts: Record<string, number> = {};
    project.project_skills.forEach((ps) => {
      ps.skills.category_skills.forEach((cs) => {
        const catName = cs.categories.categoryname;
        categoryCounts[catName] = (categoryCounts[catName] || 0) + 1;
      });
    });

    // 가장 많이 쓰인 스킬의 카테고리를 이 프로젝트의 카테고리로
    let mainCategory = "Uncategorized";
    let maxCount = 0;
    for (const [cat, count] of Object.entries(categoryCounts)) {
      if (count > maxCount) {
        maxCount = count;
        mainCategory = cat;
      }
    }

    return {
      id: project.project_id,
      title: project.title,
      description: project.overview,
      imageUrl: project.img_url || "https://placehold.co/600x400/cccccc/ffffff?text=No+Image",
      category: mainCategory as Category, 
      skillChips: skillChips,
      projectUrl: project.project_url || "#",
      githubUrl: project.github_url || "#"
    };
  });
};