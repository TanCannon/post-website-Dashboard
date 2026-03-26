// import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useMeta from "@/hooks/useMeta";

// import api from "@/api/axios";

import { useAuth } from "@/context/AuthContext";

// import { deletePost } from "../postService";

// import { toast } from "react-toastify";


// type Post = {
//   sno: number;
//   title: string;
//   slug: string;
//   content: string;
//   tag_line: string;
//   description: string;
//   date: string;
//   last_modified: string | null;
//   img_file: string | null;
// };

export default function Dashboard() {

  useMeta({
    title: "Dashboard | Tan's Stash",
    description: "Welcome to Tan's Stash blog"
  });

  const { logout } = useAuth();

  // const [posts, setPosts] = useState<Post[]>([]);
  // const [page, setPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     setLoading(true);
  //     setError(null);

  //     try {
  //       const response = await api.get(`/admin-get-posts?page=${page}`);

  //       const data = response.data;

  //       // Defensive fallback
  //       setPosts(Array.isArray(data.posts) ? data.posts : []);
  //       setTotalPages(data.total_pages ?? 1);

  //     } catch (err) {
  //       console.error("Error fetching posts:", err);
  //       setError("Failed to load posts.");
  //       setPosts([]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchPosts();
  // }, [page]);

  // // Delete handler
  // function handleDelete(postId: Number) {
  //   if (!confirm("Do you want to delete this blog?")) {
  //     return;
  //   }

  //   deletePost(
  //     postId
  //   )
  //     .then((response) => {
  //       setPosts(prev => prev.filter(p => p.sno !== postId));
  //       toast.success(response.message);
  //     })
  //     .catch(err => {
  //       console.error(err);
  //       toast.error("Failed to delete post");
  //     });


  // }

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
                  Manage everything in one place
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
          <Link to="/dashboard/manage-blogs"
            className="btn btn-primary flex-fill text-center">
            MANAGE BLOGS
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

      </div>
    </>
  );

}