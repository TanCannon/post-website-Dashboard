import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import useMeta from "@/hooks/useMeta";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { toast } from "react-toastify";

import type { PostUpdate } from "../postSchema";

import { usePostById } from "../hooks/usePostById";
import { useUpdatePost } from "../hooks/useUpdatePost";

type Params = {
  id: string;
};

export default function UpdatePostPage() {
  useMeta({
    title: "Update Blog | Tan's Stash",
    description: "Welcome to Tan's Stash blog",
  });

  const { id } = useParams<Params>();
  const numericId = Number(id);

  const [post, setPost] = useState<PostUpdate>({
    sno: 0,
    title: "",
    slug: "",
    content: "",
    tag_line: "",
    description: "",
    img_file: null,
  });

  // Fetch single post
  const { data, isLoading, isError, error } = usePostById(numericId);

  // Update mutation
  const { mutate: updatePostMutation, isPending } = useUpdatePost();

  // Sync fetched post into local form state
  useEffect(() => {
    if (data) {
      setPost({
        sno: data.sno ?? 0,
        title: data.title ?? "",
        slug: data.slug ?? "",
        content: data.content ?? "",
        tag_line: data.tag_line ?? "",
        description: data.description ?? "",
        img_file: data.img_file ?? null,
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    updatePostMutation(post, {
      onSuccess: (response) => {
        toast.success(response.message || "Post updated successfully");
      },
      onError: (error: any) => {
        console.error("Error updating post:", error);
        toast.error(error.message || "Failed to update post");
      },
    });
  };

  if (!numericId) {
    return <p className="text-center mt-5">Invalid post ID</p>;
  }

  if (isLoading) {
    return <p className="text-center mt-5">Loading post...</p>;
  }

  if (isError) {
    return (
      <p className="text-center mt-5 text-danger">
        {error instanceof Error ? error.message : "Failed to fetch post"}
      </p>
    );
  }

  return (
    <>
      <header
        className="masthead"
        style={{
          backgroundImage: `url("/assets/img/home-bg.jpg")`,
        }}
      >
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="page-heading">
                <h1>Admin Panel</h1>
                <span className="subheading">
                  Manage your post and change them
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-7">
            <h1>Update Blog (ID: {numericId})</h1>

            <form className="mb-4" onSubmit={handleSubmit}>
              {/* Title */}
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  name="title"
                  type="text"
                  placeholder="Title"
                  value={post.title}
                  onChange={handleChange}
                />
                <label>Title</label>
              </div>

              {/* Tag Line */}
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  name="tag_line"
                  type="text"
                  placeholder="Tagline"
                  value={post.tag_line}
                  onChange={handleChange}
                />
                <label>Tagline</label>
              </div>

              {/* Description */}
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  name="description"
                  type="text"
                  placeholder="Description"
                  value={post.description}
                  onChange={handleChange}
                />
                <label>Description</label>
              </div>

              {/* Slug */}
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  name="slug"
                  type="text"
                  placeholder="Slug"
                  value={post.slug}
                  onChange={handleChange}
                />
                <label>Slug</label>
              </div>

              {/* Content */}
              <div className="mb-3 mt-3">
                <label className="form-label">Content</label>
                <CKEditor
                  editor={ClassicEditor}
                  data={post.content}
                  onChange={(_, editor) => {
                    const data = editor.getData();
                    setPost((prev) => ({
                      ...prev,
                      content: data,
                    }));
                  }}
                />
              </div>

              {/* Image File */}
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  name="img_file"
                  type="text"
                  placeholder="Image file"
                  value={typeof post.img_file === "string" ? post.img_file : ""}
                  onChange={handleChange}
                />
                <label>Image file</label>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="btn btn-primary"
              >
                {isPending && (
                  <span className="spinner-border spinner-border-sm me-2"></span>
                )}
                {isPending ? "Updating..." : "Update Blog"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}