export type Category = "All" | "Frontend" | "Backend" | "Mobile" | "DevOps" | "Uncategorized";
export const CATEGORIES: Category[] = ["All", "Frontend", "Backend", "Mobile", "DevOps"];

export interface RawCategorySkill {
  categories: { categoryname: string };
}
export interface RawSkill {
  name: string;
  category_skills: RawCategorySkill[];
}
export interface RawProjectSkill {
  skill_id: number;
  skill_reason: string | null;
  skills: RawSkill;
}
export interface RawProject {
  project_id: number;
  slug: string;
  title: string;
  duration: string;
  contribution: string;
  role: string;
  overview: string;
  img_url: string | null;
  readme: string;
  slogan: string | null;
  introduction: string | null;
  github_url: string | null;
  project_url: string | null;
  project_skills: RawProjectSkill[];
}

export interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: Category;
  skillChips: string[];
  slogan: string;
  introduction: string;
  projectUrl: string;
  githubUrl: string;
}

export interface ProjectInsertPayload {
  title: string;
  slogan: string;
  introduction: string;
  role: string;
  duration: string;
  contribution: string;
  overview: string;
  img_url?: string;
  readme: string;
  github_url?: string;
  project_url?: string;
  project_skills: {
    isNew: boolean;
    skill_id?: number;
    name: string;
    category_id?: number;
    skill_reason: string;
  }[];
} 