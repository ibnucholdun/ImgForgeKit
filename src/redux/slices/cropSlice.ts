import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type CropedFile = { cropedUrl: string; fileId: string };

type ResiseInitialState = {
  cropedFiles: CropedFile[];
  isProses: boolean;
};

const initialState: ResiseInitialState = {
  cropedFiles: [],
  isProses: false,
};

const cropSlice = createSlice({
  name: "crop",
  initialState,
  reducers: {
    setCropedFile(state, action: PayloadAction<CropedFile[]>) {
      state.cropedFiles = action.payload;
    },
    setIsProses(state, action: PayloadAction<boolean>) {
      state.isProses = action.payload;
    },
  },
});

export const { setCropedFile, setIsProses } = cropSlice.actions;

export default cropSlice.reducer;
