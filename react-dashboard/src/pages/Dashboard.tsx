import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useMeta from "../hooks/useMeta";

export default function Dashboard() {

  useMeta({
    title: "Dashboard | Tan's Stash",
    description: "Welcome to Tan's Stash blog"
  });

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/admin-get-posts?page=${page}`);
        const data = await response.json();

        setPosts(data.posts);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Error fetching posts:", error);
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
              {posts.map((post) => (
                <tr key={post.sno}>
                  <td>{post.sno}</td>
                  <td>{post.title}</td>
                  <td>{post.date}</td>

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
              ))}
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
        setPosts(posts.filter(p => p.sno !== postId));
      })
      .catch(err => console.error(err));
  }
}