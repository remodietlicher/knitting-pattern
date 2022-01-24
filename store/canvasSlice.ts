import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CanvasState {
  height: number;
  width: number;
  pxPerCm: number;
}

const initialState: CanvasState = {
  height: 500,
  width: 500,
  pxPerCm: 50,
};

export const CanvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    setDimsCm: (
      state,
      action: PayloadAction<{ widthInCm: number; heightInCm: number }>
    ) => {
      state.height = action.payload.heightInCm * state.pxPerCm;
      state.width = action.payload.widthInCm * state.pxPerCm;
    },
    setPxPerCm: (state, action: PayloadAction<number>) => {
      state.height = (state.height / state.pxPerCm) * action.payload;
      state.width = (state.width / state.pxPerCm) * action.payload;
      state.pxPerCm = action.payload;
    },
  },
});

export const { setDimsCm, setPxPerCm } = CanvasSlice.actions;

export default CanvasSlice.reducer;
