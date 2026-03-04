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

export interface SkillOption {
  skill_id: number;
  skill_name: string;
  category_id: number;
  category_name: string;
}

export const getAllSkills = async (): Promise<SkillOption[]> => {
  const { data, error } = await supabase.rpc('get_all_skills');

  if (error) {
    console.error("스킬 목록 불러오기 실패:", error.message);
    throw new Error(error.message);
  }

  return data;
};

export const updateProject = async (projectId: number, projectData: ProjectInsertPayload) => {
  const { data, error } = await supabase.rpc('update_project_with_skills', {
    payload: { ...projectData, project_id: projectId }
  });

  if (error) throw new Error(error.message);
  return data;
};

export const deleteProject = async (projectId: number) => {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('project_id', projectId);

  if (error) throw new Error(error.message);
};