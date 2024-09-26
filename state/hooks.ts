/**
 * Custom hooks for typed access to Redux store.
 * - `useAppDispatch`: Dispatch actions with proper types.
 * - `useAppSelector`: Select state with proper types.
 * - `useAppStore`: Access the entire store with proper types.
 */

import { useDispatch, useSelector, useStore } from "react-redux";
import type { AppDispatch, AppStore, RootState } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
