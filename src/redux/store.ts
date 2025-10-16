import { configureStore } from "@reduxjs/toolkit";
import compress from "./slices/compressSlice";
import resize from "./slices/resizeSlice";
import crop from "./slices/cropSlice";
import upscale from "./slices/upscaleSlice";
import removeBackground from "./slices/removeBackgroundSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      compress,
      resize,
      crop,
      upscale,
      removeBackground,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const store = makeStore();
