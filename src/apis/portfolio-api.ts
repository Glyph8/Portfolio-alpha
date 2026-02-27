import { supabase } from "../libs/supabaseClient";
import type { RawProject } from "../types/projec-type";

export const fetchAndTransformProjects = async (): Promise<RawProject[]> => {
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

  return rawProjects;
};