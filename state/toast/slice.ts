import { ReactNode } from "react";
/**
 * Toast.tsx
 * This logic used to manipulate Toast state from the actions.
 */
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
interface ToastState {
  show: boolean;
  position: ToastOpen;
  type: ToastType;
  content: string;
  title: string;
}
export enum ToastOpen {
  leftTop = "leftTop",
  rightTop = "rightTop",
  leftBottom = "leftBottom",
  rightBottom = "rightBottom",
}
export enum ToastType {
  info = "info",
  error = "error",
  success = "success",
}

// Define the initial state using that type
const initialState: ToastState = {
  title: "",
  content: "",
  show: false,
  type: ToastType.info,
  position: ToastOpen.leftBottom,
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.show = true;
      state.type = action.payload.type;
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.position = action.payload.position;
    },
    closeToast: (state) => {
      state.title = "";
      state.content = "";
      state.show = false;
      state.type = ToastType.info;
      state.position = ToastOpen.leftBottom;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showToast, closeToast } = toastSlice.actions;

// selector
export const selectToast = (state: RootState) => state.toast.show;
export const selectToastPosition = (state: RootState) => state.toast.position;
export const selectToastTitle = (state: RootState) => state.toast.title;
export const selectToastContent = (state: RootState) => state.toast.content;
export const selectToastType = (state: RootState) => state.toast.type;

const toastReducer = toastSlice.reducer;
export default toastReducer;
