"use client";
/**
 * DrawerContainer.tsx
 * This container used to wrap the drawer functionality has controlled by useDrawer hook
 */
import useDrawer from "@/hooks/useDrawer";
import { DrawerOpen } from "@/state/drawer/slice";
import React from "react";

export default function DrawerContainer() {
  const {
    showDrawer,
    onCloseDrawer,
    DrawerComponent,
    dimmer,
    position = DrawerOpen.right,
    width,
  } = useDrawer();

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onCloseDrawer();
    }
  };

  if (!showDrawer || !DrawerComponent) return <></>;

  const positions: any = {
    [DrawerOpen.left]: "left-0 !animate-[moveRight_1s_forwards]",
    [DrawerOpen.right]: "right-0 !animate-[moveLeft_1s_forwards]",
  };

  return (
    <div
      className={`
        fixed top-0 left-0 w-[100%] h-[100%] flex justify-center items-center z-[1000] opacity-100 visible transition-opacity duration-300 ease-in-out transition-visibility delay-300
       ${dimmer ? "bg-black/50" : "bg-transparent"}
      `}
      onClick={handleOverlayClick}
    >
      <div
        className={`
          fixed top-0 h-[100%] w-[50%] bg-white shadow-[2px_0px_4px_rgba(0,0,0,0.1)] z-[10] ${positions[position]}
         `}
      >
        <DrawerComponent />
      </div>
    </div>
  );
}
