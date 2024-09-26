/**
 * Drawer.tsx
 * This logic used to manipulate drawer state from the actions.
 */
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export enum DrawerOpen {
  left = "left",
  right = "right",
}

// Define a type for the slice state
export interface DrawerProps {
  name?: string;
  show?: boolean;
  width: string;
  dimmer?: boolean;
  position?: DrawerOpen;
  onSuccess?: (args?: any) => void;
  onClose?: (args?: any) => void;
  Component?: React.FunctionComponent<any> | null;
}

// Define the initial state using that type
const initialState: DrawerProps = {
  width: "50%",
  show: false,
  dimmer: true,
  name: "Drawer",
  Component: null,
  position: DrawerOpen.right,
};

export const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    showDrawer: (state, action) => {
      state.show = true;
      state.name = action.payload.name;
      state.width = action.payload.width;
      state.dimmer = action.payload.dimmer;
      state.position = action.payload.position;
      state.Component = action.payload.Component;
      state.onSuccess = action.payload.onSuccess;
      state.onClose = action.payload.onClose;
    },
    closeDrawer: (state) => {
      state.name = "";
      state.dimmer = true;
      state.show = false;
      state.width = "50%";
      state.Component = null;
      state.position = DrawerOpen.right;
      state.onSuccess = undefined;
      state.onClose = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showDrawer, closeDrawer } = drawerSlice.actions;
// selector
export const selectDrawer = (state: RootState) => state.drawer.show;
export const selectDrawerName = (state: RootState) => state.drawer.name;
export const selectDrawerPostion = (state: RootState) => state.drawer.position;
export const selectDrawerDimmer = (state: RootState) => state.drawer.dimmer;
export const selectDrawerWidth = (state: RootState) => state.drawer.width;
export const selectDrawerOnSuccess = (state: RootState) =>
  state.drawer.onSuccess;
export const selectDrawerOnClose = (state: RootState) => state.drawer.onClose;
export const selectDrawerComponent = (state: RootState) =>
  state.drawer.Component;
const drawerReducer = drawerSlice.reducer;
export default drawerReducer;
