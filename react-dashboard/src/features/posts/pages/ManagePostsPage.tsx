import { useState } from "react";
import { Link } from "react-router-dom";
import useMeta from "@/hooks/useMeta";
import { useAuth } from "@/context/AuthContext";
import { PostsTable } from "../components/PostsTable";
import { usePosts } from "../hooks/usePosts";

export default function ManagePostsPage() {
  useMeta({
    title: "Dashboard | Tan's Stash",
    description: "Welcome to Tan's Stash blog",
  });

  const { logout } = useAuth();

  const [page, setPage] = useState(1)

  const { data, isLoading, isError, error } = usePosts(page)

  const posts = data?.posts || []
  const totalPages = data?.total_pages || 1
  console.log(`totalpages: ${totalPages}`)

  return (
    <>
      {/* Header */}
      <header
        className="masthead"
        style={{
          backgroundImage: "url('/assets/img/home-bg.jpg')",
        }}
      >
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="site-heading">
                <h1>Blog Studio</h1>
                <h2 className="subheading">
                  Write, edit, and manage your blogs
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
          <Link
            to="/dashboard/manage-blogs/add-blog"
            className="btn btn-primary flex-fill text-center"
          >
            ADD A NEW BLOG
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
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>

        <hr />

        <PostsTable
          posts={posts}
          loading={isLoading}
          isError={isError}
          error={error}
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>
    </>
  );
}