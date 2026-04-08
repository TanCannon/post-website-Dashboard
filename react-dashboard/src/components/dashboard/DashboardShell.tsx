import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import DashboardTopbar from "./DashboardTopbar";
import "./dashboard.css";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  closeMobileSidebar,
  openMobileSidebar,
  toggleDesktopSidebar,
} from "@/features/layout/layoutSlice";

export default function DashboardShell() {
  const dispatch = useAppDispatch();

  const mobileOpen = useAppSelector((state) => state.layout.mobileOpen);
  const desktopCollapsed = useAppSelector(
    (state) => state.layout.desktopCollapsed
  );

  return (
    <div className="dashboard-wrapper bg-light min-vh-100">
      <DashboardSidebar
        mobileOpen={mobileOpen}
        desktopCollapsed={desktopCollapsed}
        onCloseMobile={() => dispatch(closeMobileSidebar())}
        onToggleDesktop={() => dispatch(toggleDesktopSidebar())}
      />

      <div className={`dashboard-main ${desktopCollapsed ? "expanded" : ""}`}>
        <DashboardTopbar
          onOpenMobile={() => dispatch(openMobileSidebar())}
          onToggleDesktop={() => dispatch(toggleDesktopSidebar())}
          desktopCollapsed={desktopCollapsed}
        />

        {/* <main className="p-3 p-md-4"> */}
          <Outlet />
        {/* </main> */}
      </div>
    </div>
  );
}