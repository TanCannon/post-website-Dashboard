import { useQuery } from "@tanstack/react-query";
import { getPaginatedPosts } from "../postService";

export const usePosts = (page: number) => {
    return useQuery({
        queryKey: ["posts", page],
        queryFn: () => getPaginatedPosts(page),
        keepPreviousData: true,
        // You should always set staleTime + cacheTime in pagination
        staleTime: 5 * 60 * 1000, // avoid refetch
        cacheTime: 10 * 60 * 1000, // auto cleanup
    });
};