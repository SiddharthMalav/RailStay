/**
 * Wraps child components with Redux's Provider to give them access to the Redux store.
 * Ensures the Redux store is available throughout the component tree.
 */

"use client";
import { store } from "@/state/store";
import { Provider } from "react-redux";

interface Props {
  children: React.ReactNode;
}

const ReduxProvider: React.FC<Props> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

export default ReduxProvider;
