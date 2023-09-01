import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from ".";
import { AlertTypeEnum, Post, UpdatePostInput } from "../types";
import { updateUserPost } from "../api/post";
import { showAlert } from "../store/alert";
import { useState } from "react";

export const usePostUpdate = (postId: string) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { user } = useAppSelector(state => state.auth);
  const [isEditMode, setEditMode] = useState(false);

  const cancelEditMode = () => {
    setEditMode(false);
  };

  const switchToEditMode = () => {
    setEditMode(true);
  };

  const updateItemInList = (list: Post[], updatedItem: Post) => {
    return list.map((item: Post) => {
      if (item._id === updatedItem._id) {
        return { ...item, ...updatedItem }
      }
      return item;
    });
  };

  const { mutate } = useMutation({
    mutationFn: (postMutation: UpdatePostInput) => {
      return updateUserPost(postId, postMutation)
    },
    onSuccess: (updatedPost) => {
      dispatch(
        showAlert({
          type: AlertTypeEnum.Success,
          message: 'Post updated!'
        })
      );

      queryClient.setQueryData<Post[]>(['posts'], (oldPosts) => {
        return oldPosts ? updateItemInList(oldPosts, updatedPost) : oldPosts;
      });

      cancelEditMode();
    },
    onError: (error: Error) => {
      dispatch(
        showAlert({
          type: AlertTypeEnum.Error,
          message: error.message
      }));
    }
  });

  const onPostUpdate = ({ title, description }: UpdatePostInput) => {
    if (user) {
      mutate({
        title,
        description,
        author: user._id
      });
    }
  };

  return {
    isEditMode,
    onPostUpdate,
    cancelEditMode,
    switchToEditMode,
  }
}