import { configureStore } from "@reduxjs/toolkit";
import compress from "./slices/compressSlice";
import resize from "./slices/resizeSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      compress,
      resize,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const store = makeStore();
