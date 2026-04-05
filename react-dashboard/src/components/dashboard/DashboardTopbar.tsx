type DashboardTopbarProps = {
  onOpenMobile: () => void;
  onToggleDesktop: () => void;
  desktopCollapsed: boolean;
};

export default function DashboardTopbar({
  onOpenMobile,
  onToggleDesktop,
  desktopCollapsed,
}: DashboardTopbarProps) {
  return (
    <header className="border-bottom bg-white px-3 py-3 sticky-top">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          {/* Mobile button */}
          <button
            className="btn btn-outline-secondary d-lg-none"
            onClick={onOpenMobile}
          >
            ☰
          </button>

          {/* Desktop toggle button */}
          <button
            className="btn btn-outline-secondary d-none d-lg-inline-block"
            onClick={onToggleDesktop}
          >
            {desktopCollapsed ? "☰" : "✕"}
          </button>

          <div>
            <h5 className="mb-0">Dashboard</h5>
            <small className="text-muted">
              Manage everything in one place
            </small>
          </div>
        </div>
      </div>
    </header>
  );
}