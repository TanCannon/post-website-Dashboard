import { useState } from "react";
import { Link } from "react-router-dom";
import { useDeletePostMutation } from "../hooks/useDeletePostMutation";

type Post = {
    sno: number;
    title: string;
    date?: string;
};

type PostsTableProps = {
    posts: Post[];
    loading: boolean;
    isError: boolean | null;
    error: Error | null;
    page: number;
    totalPages: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
};

export function PostsTable({
    posts,
    loading,
    isError,
    error,
    page,
    totalPages,
    setPage,
}: PostsTableProps) {
    const deletePostMutation = useDeletePostMutation();
    const [deletingId, setDeletingId] = useState<number | null>(null);

    function handleDelete(postId: number) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this post?"
        );

        if (!confirmed) return;

        setDeletingId(postId);

        deletePostMutation.mutate(postId, {
            onSettled: () => {
                setDeletingId(null);
            },
        });
    }

    return (
        <>
            {/* Posts Table */}
            <h2>WELCOME, edit files here</h2>

            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Sno</th>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="text-center">
                                    Loading posts...
                                </td>
                            </tr>
                        ) : isError ? (
                            <tr>
                                <td colSpan={5} className="text-center text-danger">
                                    {error?.message}
                                </td>
                            </tr>
                        ) : posts.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center">
                                    No posts found.
                                </td>
                            </tr>
                        ) : (
                            posts.map((post) => (
                                <tr key={post.sno}>
                                    <td>{post.sno}</td>
                                    <td>{post.title}</td>
                                    <td>{post.date || "—"}</td>

                                    <td>
                                        <Link to={`/dashboard/manage-blogs/edit/${post.sno}`}>
                                            <button
                                                className="btn btn-primary"
                                                disabled={deletingId === post.sno}
                                            >
                                                Edit
                                            </button>
                                        </Link>
                                    </td>

                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(post.sno)}
                                            disabled={deletingId === post.sno}
                                        >
                                            {deletingId === post.sno ? "Deleting..." : "Delete"}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="d-flex justify-content-between mb-4">
                {/* Previous Button */}
                <div
                    className={`btn btn-primary text-uppercase nav-button ${page === 1 ? "disabled" : ""
                        }`}
                    onClick={() => page > 1 && setPage(page - 1)}
                    style={{ cursor: page === 1 ? "not-allowed" : "pointer" }}
                >
                    ← Previous
                </div>

                {/* Next Button */}
                <div
                    className={`btn btn-primary text-uppercase nav-button ${page === totalPages ? "disabled" : ""
                        }`}
                    onClick={() => page < totalPages && setPage(page + 1)}
                    style={{ cursor: page === totalPages ? "not-allowed" : "pointer" }}
                >
                    Older Posts →
                </div>
            </div>
        </>
    );
}