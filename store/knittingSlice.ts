import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface KnittingState {
  stitches: number;
  rows: number;
  height: number;
  width: number;
}

const initialState: KnittingState = {
  stitches: 10,
  rows: 10,
  height: 10,
  width: 10,
};

export const KnittingSlice = createSlice({
  name: "knitting",
  initialState,
  // note that Immer manages scheduled state updates
  reducers: {
    setKnitting: (state, action: PayloadAction<KnittingState>) => {
      state = action.payload;
    },
  },
});

export const { setKnitting } = KnittingSlice.actions;

export default KnittingSlice.reducer;
