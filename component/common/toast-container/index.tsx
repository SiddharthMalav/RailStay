/**
 * ToastContainer.tsx
 * This container used to show alert and  has controlled by useDrawer hook
 */
"use client";
import useToast from "@/hooks/useToast";
import { ToastOpen } from "@/state/toast/slice";
import { useEffect } from "react";

type ToastProps = {
  time: number;
};

export default function ToastContainer(props: ToastProps) {
  let { time = 3000 } = props;
  const {
    showToast,
    closeToast,
    onCloseToast,
    position = ToastOpen.leftBottom,
    content,
    title,
    type,
  } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      onCloseToast();
    }, time);
    return () => clearTimeout(timer);
  }, [showToast, time]);
  if (!showToast) return <></>;

  const positions = {
    [ToastOpen.leftBottom]: "bottom-0 left-0 flex-col",
    [ToastOpen.rightBottom]: "bottom-0 right-0 flex-col",
    [ToastOpen.leftTop]: "top-0 left-0 flex-col",
    [ToastOpen.rightTop]: "top-0 right-0 flex-col",
  };

  const types = {
    error: "bg-red-600 w-[80%] text-white",
    success: "bg-green-600 w-[80%] text-white",
    info: "bg-blue-300 w-[80%] text-white",
  };

  return (
    <div
      className={`fixed z-[9999] p-[20px] w-[20%] flex items-center animate-popup transform transition-transform duration-300 ease-out
        ${positions[position]}`}
    >
      <div
        className={`
          p-[20px] rounded-lg flex items-center gap-2 w-[100%] ${types[type]}
        `}
      >
        <div className="flex flex-col justify-start text-lg">{title}</div>
        <div className="text-sm">{content}</div>
      </div>
    </div>
  );
}
