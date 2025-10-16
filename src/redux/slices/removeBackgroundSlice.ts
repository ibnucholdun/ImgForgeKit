import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type RemovedFile = { removedUrl: string; fileId: string };

type ResiseInitialState = {
  removedFiles: RemovedFile[];
  isProses: boolean;
};

const createInitialState = (): ResiseInitialState => ({
  removedFiles: [],
  isProses: false,
});

const initialState = createInitialState();

const cropSlice = createSlice({
  name: "removeBackground",
  initialState,
  reducers: {
    setRemovedFile(state, action: PayloadAction<RemovedFile[]>) {
      state.removedFiles = action.payload;
    },
    setIsProses(state, action: PayloadAction<boolean>) {
      state.isProses = action.payload;
    },
    resetRemoveBackground: () => createInitialState(),
  },
});

export const { setRemovedFile, setIsProses, resetRemoveBackground } =
  cropSlice.actions;

export default cropSlice.reducer;
