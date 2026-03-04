import { useQuery } from "@tanstack/react-query";
import { fetchAndTransformProjects, fetchProjectById } from "../../../../apis/portfolio-api";
import type { Category } from "../../../../types/projec-type";
import { useMemo } from "react";


export const useProjects = () => {
    const { data: projects, isLoading, isError, error } = useQuery({
        queryKey: ['projects'],
        queryFn: fetchAndTransformProjects,
    });

    const projectsOverview = useMemo(() => {

        if (!projects) return [];

        return projects?.map((project) => {
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
                slogan: project.slogan || "프로젝트 슬로건이 없습니다.",
                introduction: project.introduction || "프로젝트 소개가 작성되지 않았습니다.",
                projectUrl: project.project_url || "#",
                githubUrl: project.github_url || "#"
            };
        });
    }, [projects]);


    return { projects, projectsOverview, isLoading, isError, error }
}

export const useProject = (projectId?: number) => {
    const queryResult = useQuery({
        queryKey: ['project', projectId],
        queryFn: () => fetchProjectById(projectId as number),
        enabled: typeof projectId === "number",
    });

    return queryResult;
}

