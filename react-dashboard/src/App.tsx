import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";

import Dashboard from "./pages/Dashboard";
import EditPostPage from "./pages/EditPostPage";
import Login from "./pages/Login";

function App() {
  return (
      <Routes>
        <Route element={<Layout />}>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/edit/:id" element={<EditPostPage />} />
        </Route>
      </Routes>
  );
}

export default App;