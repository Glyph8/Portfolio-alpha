import { supabase } from "../libs/supabaseClient";

export const fetchProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      project_skills (
        skill_reason,
        skills (
          name
        )
      )
    `);

  if (error) {
    throw new Error(error.message);
  }

  console.log("Fetched projects:", data);

  return data;
};