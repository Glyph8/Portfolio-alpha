// hooks/use-skill-options.ts

import { useQuery } from "@tanstack/react-query";
import { getAllSkills } from "../../../apis/portfolio-api";

export const useSkillOptions = () => {
    const { data: skillOptions = [], isLoading } = useQuery({
        queryKey: ['skillOptions'],
        queryFn: getAllSkills,
    });

    return { skillOptions, isLoading };
};