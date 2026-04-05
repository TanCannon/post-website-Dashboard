import { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import DashboardTopbar from "./DashboardTopbar";
import "./dashboard.css";

export default function DashboardShell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);

  return (
    <div className="dashboard-wrapper bg-light min-vh-100">
      <DashboardSidebar
        mobileOpen={mobileOpen}
        desktopCollapsed={desktopCollapsed}
        onCloseMobile={() => setMobileOpen(false)}
        onToggleDesktop={() => setDesktopCollapsed((prev) => !prev)}
      />

      <div
        className={`dashboard-main ${
          desktopCollapsed ? "expanded" : ""
        }`}
      >
        <DashboardTopbar
          onOpenMobile={() => setMobileOpen(true)}
          onToggleDesktop={() => setDesktopCollapsed((prev) => !prev)}
          desktopCollapsed={desktopCollapsed}
        />

        {/* <main className="p-3 p-md-4"> */}
          <Outlet />
        {/* </main> */}
      </div>
    </div>
  );
}