import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deletePost } from "../postService";
import { PostsResponse } from "../postSchema";

export function useDeletePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,

    // 1) Optimistically remove post from all cached pages
    onMutate: async (postId) => {
      // stop any in-flight refetches from overwriting our optimistic update
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      // snapshot all paginated posts queries
      const previousPostsQueries = queryClient.getQueriesData({
        queryKey: ["posts"],
      });

      // update all cached post pages
      queryClient.setQueriesData<PostsResponse>({ queryKey: ["posts"] }, (oldData) => {
        if (!oldData?.posts) return oldData;

        return {
          ...oldData,
          posts: oldData.posts.filter((post) => post.sno !== postId),
        };
      });

      return { previousPostsQueries };
    },

    // 2) rollback if API fails
    onError: (_error, _postId, context) => {
      if (context?.previousPostsQueries) {
        context.previousPostsQueries.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }

      toast.error("Failed to delete blog");
    },

    // 3) success feedback
    onSuccess: () => {
      toast.success("Blog deleted successfully");
    },

    // 4) final sync with backend
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}