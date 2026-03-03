import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useMeta from "../hooks/useMeta";

import api from "../api/axios";

import { useAuth } from "../context/AuthContext";

type Post = {
  sno: number;
  title: string;
  slug: string;
  content: string;
  tag_line: string;
  description: string;
  date: string;
  last_modified: string | null;
  img_file: string | null;
};

export default function Dashboard() {

  useMeta({
    title: "Dashboard | Tan's Stash",
    description: "Welcome to Tan's Stash blog"
  });

  const { logout } = useAuth();

  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`/admin-get-posts?page=${page}`);

        const data = response.data;

        // Defensive fallback
        setPosts(Array.isArray(data.posts) ? data.posts : []);
        setTotalPages(data.total_pages ?? 1);

      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts.");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  return (
    <>
      {/* Header */}
      <header
        className="masthead"
        style={{
          backgroundImage: "url('/assets/img/home-bg.jpg')"
        }}
      >
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="site-heading">
                <h1>Admin Panel</h1>
                <h2 className="subheading">
                  Manage your post and change them
                </h2>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container px-4 px-lg-5 fs-6 fs-md-4 fs-lg-2">

        <h2>Basic actions</h2>

        <div className="d-grid gap-2 d-md-flex">
          <Link to="/dashboard/add-blog"
            className="btn btn-primary flex-fill text-center">
            ADD A NEW POST
          </Link>

          <Link to="/dashboard/inbox"
            className="btn btn-primary flex-fill text-center">
            INBOX
          </Link>

          <Link to="/dashboard/analytics"
            className="btn btn-primary flex-fill text-center">
            ANALYTICS
          </Link>

          <button
            id="dashboardLogoutBtn"
            className="btn btn-primary flex-fill text-center"
            onClick={logout}
          >
            LOGOUT
          </button>
        </div>

        <hr />

        {/* Upload Section */}
        <h2>Upload a file</h2>

        <form id="postBannerUploadForm">
          <div className="row align-items-end">

            <div className="col-12 col-lg-8 mb-3">
              <input
                className="form-control"
                type="file"
                name="file1"
                required
              />
            </div>

            <div className="col-12 col-lg-4 d-grid">
              <button type="submit"
                className="btn btn-primary">
                Submit
              </button>
            </div>

          </div>
        </form>

        <hr />

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
              ) : error ? (
                <tr>
                  <td colSpan={5} className="text-center text-danger">
                    {error}
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
                      <Link to={`/dashboard/edit/${post.sno}`}>
                        <button className="btn btn-primary">
                          Edit
                        </button>
                      </Link>
                    </td>

                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(post.sno)}
                      >
                        Delete
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
            className={`btn btn-primary text-uppercase nav-button ${page === 1 ? "disabled" : ""}`}
            onClick={() => page > 1 && setPage(page - 1)}
            style={{ cursor: page === 1 ? "not-allowed" : "pointer" }}
          >
            ← Previous
          </div>

          {/* Next Button */}
          <div
            className={`btn btn-primary text-uppercase nav-button ${page === totalPages ? "disabled" : ""}`}
            onClick={() => page < totalPages && setPage(page + 1)}
            style={{ cursor: page === totalPages ? "not-allowed" : "pointer" }}
          >
            Older Posts →
          </div>

        </div>
      </div>
    </>
  );


  // Delete handler
  function handleDelete(postId) {
    fetch(`/api/posts/${postId}`, {
      method: "DELETE"
    })
      .then(() => {
        setPosts(prev => prev.filter(p => p.sno !== postId));
      })
      .catch(err => console.error(err));
  }
}