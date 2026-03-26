import type { Post } from "./postSchema";

import api from "@/api/axios";

const validatePost = (post: Post) => {
  if (!post.title || post.title.trim().length < 3) {
    throw new Error("Title must be at least 3 characters.");
  }

  if (!/^[a-z0-9-]+$/.test(post.slug)) {
    throw new Error("Slug must contain only lowercase letters, numbers, and hyphens.");
  }

  if (!post.content || post.content.trim().length < 10) {
    throw new Error("Content must be at least 10 characters.");
  }
};



export const createPost = async (
  post: Post
) => {
  // 1. Validate before API call
  validatePost(post);

  // 2. Handle data uploads properly

  try {
    await api.put(`/create-blog`, post);
    return { success: true, message: "Blog created successfully!" };

  } catch (error: any) {
    const message =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      "Failed to create blog.";

    throw new Error(message);
  }
};

export const getPostById = async (id: number) => {
  try {
    const response = await api.get(`/blog/${id}`);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      "Failed to fetch blog.";

    throw new Error(message);
  }
};

export const updatePost = async (
  post: Post
) => {
  // 1. Validate before API call
  validatePost(post);

  // 2. Handle data uploads properly

  try {
    await api.put(`/update-blog/${post.sno}`, post);
    return { success: true, message: "Blog updated successfully!" };

  } catch (error: any) {
    const message =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      "Failed to update blog.";

    throw new Error(message);
  }
};

export const deletePost = async (postId: Number) =>{

  try{
    await api.delete(`/delete-blog/${postId}`);
    return { success: true, message: "Blog deleted successfully!" };
  }catch (error: any) {
    const message =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      "Failed to delete blog.";

    throw new Error(message);
  }

};