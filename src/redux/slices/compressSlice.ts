import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type CompressedFile = { compressedUrl: string; fileId: string };

interface CompressState {
  compressedFiles: CompressedFile[];
  isProses: boolean;
}

const initialState: CompressState = {
  compressedFiles: [],
  isProses: false,
};

const compressSlice = createSlice({
  name: "compress",
  initialState,
  reducers: {
    setCompressedFiles(state, action: PayloadAction<CompressedFile[]>) {
      state.compressedFiles = action.payload;
    },
    addCompressedFile(state, action: PayloadAction<CompressedFile>) {
      state.compressedFiles.push(action.payload);
    },
    clearCompressedFiles(state) {
      state.compressedFiles = [];
    },
    setIsProses(state, action: PayloadAction<boolean>) {
      state.isProses = action.payload;
    },
  },
});

export const {
  setCompressedFiles,
  addCompressedFile,
  clearCompressedFiles,
  setIsProses,
} = compressSlice.actions;

export default compressSlice.reducer;
