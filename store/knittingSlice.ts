import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface KnittingState {
  stitchDensity: number;
  rowDensity: number;
  height: number;
  width: number;
  pattern: boolean[][];
}

const INIT_STITCH_DENSITY = 10;
const INIT_ROW_DENSITY = 10;
const INIT_HEIGTH = 10;
const INIT_WIDTH = 10;

export const DENSITY_REF = 10;

export function countFromDensity(density: number, total: number) {
  return Math.floor((density / DENSITY_REF) * total);
}

const initialState: KnittingState = {
  stitchDensity: INIT_STITCH_DENSITY,
  rowDensity: INIT_ROW_DENSITY,
  height: INIT_HEIGTH,
  width: INIT_WIDTH,
  pattern: Array.from(
    Array(countFromDensity(INIT_ROW_DENSITY, INIT_HEIGTH)),
    (_) => Array(countFromDensity(INIT_STITCH_DENSITY, INIT_WIDTH)).fill(false)
  ),
};

export const KnittingSlice = createSlice({
  name: "knitting",
  initialState,
  // note that Immer manages scheduled state updates
  reducers: {
    setKnitting: (state, action: PayloadAction<KnittingState>) => {
      state.height = action.payload.height;
      state.width = action.payload.width;
      state.rowDensity = action.payload.rowDensity;
      state.stitchDensity = action.payload.stitchDensity;
      state.pattern = action.payload.pattern;
    },
  },
});

export const { setKnitting } = KnittingSlice.actions;

export default KnittingSlice.reducer;
