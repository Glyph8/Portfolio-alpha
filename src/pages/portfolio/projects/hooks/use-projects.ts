import { useQuery } from "@tanstack/react-query";
import { fetchAndTransformProjects } from "../../../../apis/portfolio-api";


export const useProjects = () => {
    const { data: projects, isLoading, isError, error } = useQuery({
        queryKey: ['projects'], 
        queryFn: fetchAndTransformProjects, 
    });

    return { projects, isLoading, isError, error }
}

