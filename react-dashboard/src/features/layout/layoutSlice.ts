import { createSlice } from "@reduxjs/toolkit";

type LayoutState = {
  mobileOpen: boolean;
  desktopCollapsed: boolean;
};

const initialState: LayoutState = {
  mobileOpen: false,
  desktopCollapsed: false,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    openMobileSidebar: (state) => {
      state.mobileOpen = true;
    },
    closeMobileSidebar: (state) => {
      state.mobileOpen = false;
    },
    toggleMobileSidebar: (state) => {
      state.mobileOpen = !state.mobileOpen;
    },
    toggleDesktopSidebar: (state) => {
      state.desktopCollapsed = !state.desktopCollapsed;
    },
    closeDesktopSidebar: (state) => {
      state.desktopCollapsed = true;
    },
    openDesktopSidebar: (state) => {
      state.desktopCollapsed = false;
    },
  },
});

export const {
  openMobileSidebar,
  closeMobileSidebar,
  toggleMobileSidebar,
  toggleDesktopSidebar,
  closeDesktopSidebar,
  openDesktopSidebar,
} = layoutSlice.actions;

export default layoutSlice.reducer;