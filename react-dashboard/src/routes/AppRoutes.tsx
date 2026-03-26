import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../layout/Layout";

import Dashboard from "../pages/Dashboard";
import UpdatePostPage from "../pages/UpdatePostPage";
import Login from "../pages/Login";
import AddPostPage from "../pages/AddPostPage";
import Inbox from "../pages/Inbox";
import InboxMsgPage from "../pages/InboxMsgPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/add-blog" element={<AddPostPage />} />
          <Route path="/dashboard/edit/:id" element={<UpdatePostPage />} />
          <Route path="/dashboard/inbox" element={<Inbox />} />
          <Route path="/dashboard/inbox/:id" element={<InboxMsgPage />} />
        </Route>
      </Routes>

      {/* Toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default AppRoutes;