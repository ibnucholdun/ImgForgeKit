import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type NumberOrEmpty = number | "";
export type ResizeState = {
  width: NumberOrEmpty;
  height: NumberOrEmpty;
  lockAspect: boolean;
  noEnlarge: boolean;
  original: { ow: number; oh: number; ratio: number } | null;
};

type ResizedFile = { resizedUrl: string; fileId: string };

const initialResize: ResizeState = {
  width: "",
  height: "",
  lockAspect: false,
  noEnlarge: false,
  original: null,
};

type ResiseInitialState = {
  resize: ResizeState;
  resizedFiles: ResizedFile[];
  isProses: boolean;
};

const initialState: ResiseInitialState = {
  resize: initialResize,
  resizedFiles: [],
  isProses: false,
};

const resizeSlice = createSlice({
  name: "resize",
  initialState,
  reducers: {
    setResizedFile(state, action: PayloadAction<ResizedFile[]>) {
      state.resizedFiles = action.payload;
    },
    seedResizeFromOriginal(
      state,
      action: PayloadAction<{ ow: number; oh: number }>,
    ) {
      const { ow, oh } = action.payload;
      const ratio = ow > 0 && oh > 0 ? ow / oh : 0;
      state.resize.original = { ow, oh, ratio };
      state.resize.width = ow || "";
      state.resize.height = oh || "";
    },
    setResizeSize(
      state,
      action: PayloadAction<{ width: NumberOrEmpty; height: NumberOrEmpty }>,
    ) {
      state.resize.width = action.payload.width;
      state.resize.height = action.payload.height;
    },
    setResizeWidth(state, action: PayloadAction<NumberOrEmpty>) {
      state.resize.width = action.payload;
    },
    setResizeHeight(state, action: PayloadAction<NumberOrEmpty>) {
      state.resize.height = action.payload;
    },
    setLockAspect(state, action: PayloadAction<boolean>) {
      state.resize.lockAspect = action.payload;
    },
    setNoEnlarge(state, action: PayloadAction<boolean>) {
      state.resize.noEnlarge = action.payload;
    },
    resetResize(state) {
      state.resize = initialResize;
    },
    setIsProses(state, action: PayloadAction<boolean>) {
      state.isProses = action.payload;
    },
  },
});

export const {
  seedResizeFromOriginal,
  setResizeSize,
  setResizeWidth,
  setResizeHeight,
  setLockAspect,
  setNoEnlarge,
  resetResize,
  setResizedFile,
  setIsProses,
} = resizeSlice.actions;

export default resizeSlice.reducer;
