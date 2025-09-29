import { configureStore } from "@reduxjs/toolkit";
import compress from "./slices/compressSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      compress,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const store = makeStore();
