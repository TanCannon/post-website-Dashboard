import { useState } from "react";
import { Link } from "react-router-dom";
import useMeta from "@/hooks/useMeta";
import { useAuth } from "@/context/AuthContext";
import { PostsTable } from "../components/PostsTable";
import { usePosts } from "../hooks/usePosts";

// type Post = {
// sno: number;
// title: string;
// slug: string;
// content: string;
// tag_line: string;
// description: string;
// date: string;
// last_modified: string | null;
// img_file: string | null;
// };

export default function ManagePostsPage() {
  useMeta({
    title: "Dashboard | Tan's Stash",
    description: "Welcome to Tan's Stash blog",
  });

  const { logout } = useAuth();

  // const [posts, setPosts] = useState<Post[]>([]);
  // const [page, setPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  // // const [loading, setLoading] = useState(false);
  // // const [error, setError] = useState<string | null>(null);

  // const { posts, loading, error } = usePosts(page)

  const [page, setPage] = useState(1)

  const { data, isLoading, isError } = usePosts(page)

  const posts = data?.posts || []
  const totalPages = data?.total_pages || 1
  console.log(`totalpages: ${totalPages}`)

  // useEffect(() => {
  // const fetchPosts = async () => {
  // setLoading(true);
  // setError(null);

  // try {
  // const response = await api.get(`/admin-get-posts?page=${page}`);

  // const data = response.data;

  // // Defensive fallback
  // setPosts(Array.isArray(data.posts) ? data.posts : []);
  // setTotalPages(data.total_pages ?? 1);

  // } catch (err) {
  // console.error("Error fetching posts:", err);
  // setError("Failed to load posts.");
  // setPosts([]);
  // } finally {
  // setLoading(false);
  // }
  // };

  // fetchPosts();
  // }, [page]);

  // Delete handler

  /* holding this feature for now (27-03-2026)
  function handleDelete(postId: number) {
  if (!confirm("Do you want to delete this blog?")) {
  return;
  }
 
  deletePost(postId)
  .then((response) => {
  setPosts((prev) => prev.filter((p) => p.sno !== postId));
  toast.success(response.message);
  })
  .catch((err) => {
  console.error(err);
  toast.error("Failed to delete post");
  });
  }
  */
  function handleDelete(postId: number) {
    console.log(postId);
  }
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
          error={isError}
          page={page}
          totalPages={totalPages}
          setPage={setPage}
          handleDelete={handleDelete}
        />
      </div>
    </>
  );
}