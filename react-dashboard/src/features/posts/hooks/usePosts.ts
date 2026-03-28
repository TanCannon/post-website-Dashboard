import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getPaginatedPosts } from "../postService";

//-- types -- //
import {PostsResponse} from "../postSchema"

export const usePosts = (page: number) => {
    return useQuery<PostsResponse>({
        queryKey: ["posts", page],
        queryFn: () => getPaginatedPosts(page),
        placeholderData: keepPreviousData,
        // You should always set staleTime + cacheTime in pagination
        staleTime: 5 * 60 * 1000, // avoid refetch
        gcTime: 10 * 60 * 1000, // auto cleanup
    });
};