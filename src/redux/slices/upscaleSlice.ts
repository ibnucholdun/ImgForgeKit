import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UpscaledFile = { upscaledUrl: string; fileId: string };

type ResiseInitialState = {
  baseData: { url: string; width: number; height: number; fileId: string };
  upscaledFiles: UpscaledFile[];
  upscaledTwoFiles: UpscaledFile[];
  upscaledFourFiles: UpscaledFile[];
  isProses: boolean;
  scale: 2 | 4;
};

const createInitialState = (): ResiseInitialState => ({
  baseData: { url: "", width: 0, height: 0, fileId: "" },
  upscaledTwoFiles: [],
  upscaledFourFiles: [],
  upscaledFiles: [],
  isProses: false,
  scale: 2,
});

const initialState = createInitialState();

const UpscalSlice = createSlice({
  name: "upscale",
  initialState,
  reducers: {
    setBaseData(state, action: PayloadAction<any>) {
      state.baseData = action.payload;
    },
    setScale(state, action: PayloadAction<2 | 4>) {
      state.scale = action.payload;
    },
    setUpscaledFile(state, action: PayloadAction<UpscaledFile[]>) {
      state.upscaledFiles = action.payload;
    },
    setUpscaledTwoFile(state, action: PayloadAction<UpscaledFile[]>) {
      state.upscaledTwoFiles = action.payload;
    },
    setUpscaledFourFile(state, action: PayloadAction<UpscaledFile[]>) {
      state.upscaledFourFiles = action.payload;
    },
    setIsProses(state, action: PayloadAction<boolean>) {
      state.isProses = action.payload;
    },
    resetUpscale: () => createInitialState(),
  },
});

export const {
  setUpscaledTwoFile,
  setIsProses,
  setUpscaledFourFile,
  setBaseData,
  setUpscaledFile,
  setScale,
  resetUpscale,
} = UpscalSlice.actions;

export default UpscalSlice.reducer;
