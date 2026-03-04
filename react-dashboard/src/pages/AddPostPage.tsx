import { useState } from "react";

import useMeta from "../hooks/useMeta";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { toast } from "react-toastify";

import {createPost} from "../services/postService";

import type { Post } from "../schemas/postSchema";

export default function AddPostPage() {
    useMeta({
        title: "Add New Post | Tan's Stash",
        description: "Welcome to Tan's Stash blog"
    });

    const [loading, setLoading] = useState(false);

    const [post, setPost] = useState<Post>({
        sno: 0,
        title: "",
        slug: "",
        content: "",
        tag_line: "",
        description: "",
        date: "",
        last_modified: null,
        img_file: null,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setPost((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await createPost(post);

            toast.success(response.message);

            // Reset form
            setPost({
                sno: 0,
                title: "",
                slug: "",
                content: "",
                tag_line: "",
                description: "",
                date: "",
                last_modified: null,
                img_file: null,
            });

        } catch (error: any) {
            console.error("Error creating post:", error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

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
                        <h1>Add New Post</h1>

                        <form onSubmit={handleSubmit}>
                            {/* Title */}
                            <div className="form-floating">
                                <input
                                    className="form-control"
                                    name="title"
                                    type="text"
                                    placeholder="Title"
                                    value={post.title}
                                    onChange={handleChange}
                                    required
                                />
                                <label>Title</label>
                            </div>

                            {/* Tag Line */}
                            <div className="form-floating">
                                <input
                                    className="form-control"
                                    name="tag_line"
                                    type="text"
                                    placeholder="Tagline"
                                    value={post.tag_line}
                                    onChange={handleChange}
                                    required
                                />
                                <label>Tagline</label>
                            </div>

                            {/* Description */}
                            <div className="form-floating">
                                <input
                                    className="form-control"
                                    name="description"
                                    type="text"
                                    placeholder="Description"
                                    value={post.description}
                                    onChange={handleChange}
                                    required
                                />
                                <label>Description</label>
                            </div>

                            {/* Slug */}
                            <div className="form-floating">
                                <input
                                    className="form-control"
                                    name="slug"
                                    type="text"
                                    placeholder="Slug"
                                    value={post.slug}
                                    onChange={handleChange}
                                    required
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
                            <div className="form-floating">
                                <input
                                    className="form-control"
                                    name="img_file"
                                    type="text"
                                    placeholder="Image file"
                                    value={post.img_file ?? ""}
                                    onChange={handleChange}
                                />
                                <label>Image file</label>
                            </div>

                            <br />

                            <button type="submit" disabled={loading} className="btn btn-primary">
                                {loading && (
                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                )}
                                {loading ? "Publishing..." : "Publish Post"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}