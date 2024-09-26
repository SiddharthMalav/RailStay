/**
 * Configures the Redux store with reducers and middleware.
 * Includes slices for drawer, modal, and toast states.
 * Disables serializable checks in middleware.
 */

import { configureStore } from "@reduxjs/toolkit";
import drawerReducer from "./drawer/slice";
import modalReducer from "./modal/slice";
import toastReducer from "./toast/slice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      drawer: drawerReducer,
      modal: modalReducer,
      toast: toastReducer,
    },
    middleware: getDefaultMiddleware => 
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const store = makeStore();
