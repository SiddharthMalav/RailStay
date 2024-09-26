/**
 * useDrawer.tsx
 * This hooks used to manage drawer functionality to toggle and render the drawer component
*/
"use client";
import {
  DrawerProps,
  closeDrawer,
  selectDrawer,
  selectDrawerComponent,
  selectDrawerDimmer,
  selectDrawerName,
  selectDrawerOnClose,
  selectDrawerOnSuccess,
  selectDrawerPostion,
  selectDrawerWidth,
  showDrawer,
} from "@/state/drawer/slice";
import { useAppDispatch, useAppSelector } from "@/state/hooks";

export default function useDrawer() {
  const dispatch = useAppDispatch();
  const show = useAppSelector(selectDrawer);
  const dimmer = useAppSelector(selectDrawerDimmer);
  const name = useAppSelector(selectDrawerName);
  const Component = useAppSelector(selectDrawerComponent);
  const position = useAppSelector(selectDrawerPostion);
  const width = useAppSelector(selectDrawerWidth);
  const drawerOnSuccess = useAppSelector(selectDrawerOnSuccess);
  const drawerOnClose = useAppSelector(selectDrawerOnClose);

  const onShowDrawer = (props: DrawerProps) => {
    dispatch(showDrawer(props));
  };

  const onCloseDrawer = () => {
    dispatch(closeDrawer());
    drawerOnClose?.();
  };

  const onSuccessDrawer = (...args: any) => {
    dispatch(closeDrawer());
    drawerOnSuccess?.(args);
  };

  return {
    width,
    dimmer,
    position,
    onShowDrawer,
    onCloseDrawer,
    onSuccessDrawer,
    showDrawer: show,
    drawerTitle: name,
    DrawerComponent: Component,
  };
}
