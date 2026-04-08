import { useQuery } from "@tanstack/react-query";
import { getPostById } from "../postService";

//-- types -- //
import {Post} from "../postSchema"

export const usePostById = (postId: number) => {
    return useQuery<Post>({
        queryKey: ["post", postId],
        queryFn: () => getPostById(postId),
        enabled: !!postId, //sometimes the parameters take longer to set so this tells the function to wait for parameter to load
        // You should always set staleTime + cacheTime in pagination
        staleTime: 5 * 60 * 1000, // 5 min fresh
        gcTime: 10 * 60 * 1000,   // cache stays 10 min after unused
    });
};