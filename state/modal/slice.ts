/**
 * Modal.tsx
 * This logic used to manipulate modal state from the actions.
*/
import { ReactNode } from "react";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export enum ModalSize {
  sm = "small",
  md = "medium",
  lg = "large",
  xl = "extraLarge",
}

// Define a type for the slice state
export interface ModalProps {
  show?: boolean;
  content?: string;
  title?: string;
  size?: ModalSize;
  showTitle?: boolean;
  showButton?: boolean;
  onSuccess?: (args?: any) => void;
  onClose?: (args?: any) => void;
  onSave?: Function | null;
  Component?: React.FunctionComponent<any> | null;
}

// Define the initial state using that type
const initialState: ModalProps = {
  show: false,
  content: "Modal",
  title: "Title",
  Component: null,
  onSave: null,
  size: ModalSize.md,
  showTitle: true,
  showButton: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.show = true;
      state.size = action.payload.size;
      state.content = action.payload.content;
      state.title = action.payload.title;
      state.showTitle = action.payload.showTitle;
      state.showButton = action.payload.showButton;
      state.onSave = action.payload.onSave;
      state.onSuccess = action.payload.onSuccess;
      state.onClose = action.payload.onClose;
      state.Component = action.payload.Component;
    },
    closeModal: (state) => {
      state.content = "";
      state.show = false;
      state.title = "Title";
      state.Component = null;
      state.size = ModalSize.md;
      state.showTitle = true;
      state.showButton = false;
      state.onSave = null;
      state.onSuccess = undefined;
      state.onClose = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showModal, closeModal } = modalSlice.actions;

// selector
export const selectModal = (state: RootState) => state.modal.show;
export const selectModalTitle = (state: RootState) => state.modal.title;
export const selectModalShowTitle = (state: RootState) => state.modal.showTitle;
export const selectModalshowButton = (state: RootState) =>
  state.modal.showButton;
export const selectModalContent = (state: RootState) => state.modal.content;
export const selectModalSize = (state: RootState) => state.modal.size;
export const selectModalonSave = (state: RootState) => state.modal.onSave;
export const selectModalComponent = (state: RootState) => state.modal.Component;
export const selectModalOnSuccess = (state: RootState) => state.modal.onSuccess;
export const selectModalOnClose = (state: RootState) => state.modal.onClose;

const modalReducer = modalSlice.reducer;
export default modalReducer;