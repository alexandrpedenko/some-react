import { apiAxios } from "../axios";
import { CreatePostInput, Post, UpdatePostInput } from "../../types";

const postsPath = 'posts';

export const createPost = async (body: CreatePostInput): Promise<Post>  => {
  const { data } = await apiAxios.post<Post>(`/${postsPath}`, body);
  return data;
}

export const getUserPosts = async (userId: string): Promise<Post[]>  => {
  const { data } = await apiAxios.get<Post[]>(`/${postsPath}/user/${userId}`);
  return data;
}

export const deleteUserPost = async (postId: string): Promise<{message: string}>  => {
  const { data } = await apiAxios.delete<{message: string}>(`/${postsPath}/${postId}`);
  return data;
}

export const updateUserPost = async (postId: string, body: UpdatePostInput): Promise<Post>  => {
  const { data } = await apiAxios.patch<Post>(`/${postsPath}/${postId}`, body);
  return data;
}

