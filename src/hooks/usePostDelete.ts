import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserPost } from "../api/post";
import { showAlert } from "../store/alert";
import { AlertTypeEnum } from "../types";
import { useAppDispatch } from ".";

export const usePostDelete = (postId: string) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const deletePost = useMutation({
    mutationFn: () => {
      return deleteUserPost(postId)
    },

    onSuccess: () => {
      dispatch(
        showAlert({
          type: AlertTypeEnum.Success,
          message: 'Post deleted!'
        })
      );
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },

    onError: (error: Error) => {
      dispatch(
        showAlert({
          type: AlertTypeEnum.Error,
          message: error.message
      }));
    }
  });

  const onDeletePost = () => {
    deletePost.mutate();
  }

  return { onDeletePost }
}