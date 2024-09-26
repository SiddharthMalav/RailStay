/**
 * useToast.tsx
 * This hooks is used to manage toast functionality throughout the project.
 */
import React, { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "@/state/hooks";

import {
  showToast,
  ToastOpen,
  ToastType,
  closeToast,
  selectToast,
  selectToastType,
  selectToastTitle,
  selectToastContent,
  selectToastPosition,
} from "@/state/toast/slice";
import { FaCheck, FaInfoCircle, FaTimes } from "react-icons/fa";

export type ToastProps = {
  type?: string;
  title?: ReactNode;
  content?: string;
  position?: ToastOpen;
  showCloseButton?: boolean;
};

export default function useToast() {
  const dispatch = useAppDispatch();
  const show = useAppSelector(selectToast);
  const type = useAppSelector(selectToastType);
  const title = useAppSelector(selectToastTitle);
  const content = useAppSelector(selectToastContent);
  const position = useAppSelector(selectToastPosition);

  const onSuccessToast = (content: string = "success", postion?: ToastOpen) => {
    dispatch(
      showToast({
        type: ToastType.success,
        title: <FaCheck />,
        content: content,
        position: postion,
      })
    );
  };

  const onErrorToast = (content: string = "error", postion?: ToastOpen) => {
    dispatch(
      showToast({
        type: ToastType.error,
        title: <FaTimes />,
        content: content,
        position: postion,
      })
    );
  };

  const onInfoToast = (content: string = "information", postion?: ToastOpen) => {
    dispatch(
      showToast({
        type: ToastType.info,
        title: <FaInfoCircle />,
        content: content,
        position: postion,
      })
    );
  };

  const onShowToast = (props: ToastProps) => {
    dispatch(showToast(props));
  };

  const onCloseToast = () => {
    dispatch(closeToast());
  };

  return {
    type,
    title,
    content,
    position,
    closeToast,
    onShowToast,
    onInfoToast,
    onErrorToast,
    onCloseToast,
    onSuccessToast,
    showToast: show,
  };
}
