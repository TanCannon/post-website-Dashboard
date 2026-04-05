import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

type DashboardSidebarProps = {
  mobileOpen: boolean;
  desktopCollapsed: boolean;
  onCloseMobile: () => void;
  onToggleDesktop: () => void;
};

const navItems = [
  {
    label: "Manage Blogs",
    to: "/dashboard/manage-blogs",
  },
  {
    label: "Inbox",
    to: "/dashboard/inbox",
  },
  {
    label: "Analytics",
    to: "/dashboard/analytics",
  },
];

export default function DashboardSidebar({
  mobileOpen,
  desktopCollapsed,
  onCloseMobile,
//   onToggleDesktop,
}: DashboardSidebarProps) {
  const location = useLocation();
  const { logout } = useAuth();

  const handleNavClick = () => {
    if (window.innerWidth < 992) {
      onCloseMobile();
    }
  };

  const handleLogout = () => {
    if (window.innerWidth < 992) {
      onCloseMobile();
    }
    logout();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-lg-none"
          style={{ zIndex: 1040 }}
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`dashboard-sidebar bg-white border-end shadow-sm ${
          mobileOpen ? "show-mobile" : ""
        } ${desktopCollapsed ? "desktop-collapsed" : ""}`}
      >
        <div className="d-flex flex-column h-100">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center border-bottom p-3">
            <div>
              <h4 className="mb-0">Admin Panel</h4>
              <small className="text-muted">Tan's Stash</small>
            </div>

            {/* Mobile close */}
            <button
              className="btn btn-sm btn-outline-secondary d-lg-none"
              onClick={onCloseMobile}
            >
              ✕
            </button>

            {/* Desktop collapse */}
            {/* <button
              className="btn btn-sm btn-outline-secondary d-none d-lg-inline-block"
              onClick={onToggleDesktop}
            >
              ✕
            </button> */}
          </div>

          {/* Nav */}
          <nav className="flex-grow-1 p-3">
            <div className="nav flex-column gap-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + "/");

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={handleNavClick}
                    className={`btn text-start ${
                      isActive ? "btn-dark" : "btn-outline-secondary"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="border-top p-3">
            <button className="btn btn-danger w-100" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}