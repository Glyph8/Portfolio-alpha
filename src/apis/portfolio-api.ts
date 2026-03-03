import { supabase } from "../libs/supabaseClient";
import type { ProjectInsertPayload, RawProject } from "../types/projec-type";

export const fetchAndTransformProjects = async (): Promise<RawProject[]> => {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      project_skills (
        skill_reason,
        skills (
          skill_id,
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

  return rawProjects;
};

export const createProject = async (projectData: ProjectInsertPayload) => {
  const { data, error } = await supabase.rpc('insert_project_with_skills', {
    payload: projectData
  });

  if (error) {
    console.error("저장 실패:", error.message);
    throw new Error(error.message);
  }

  return data; 
};