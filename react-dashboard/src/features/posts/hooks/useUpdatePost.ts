import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost } from "../postService";

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePost,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", variables.sno] });
    //   queryClient.setQueryData(["post", variables.sno], updatedPost); 
    // //This is faster, it changes the cache data upon success from the api response so no need to refetch!!!
    // But the backend is returning a msg instead of updated post so its not working. So I have commented it.
    },
  });
};