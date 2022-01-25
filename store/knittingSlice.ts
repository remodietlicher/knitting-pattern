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
    setKnittingHeight: (state, action: PayloadAction<number>) => {
      state.height = action.payload;
    },
    setKnittingWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
    },
    setKnittingRowDensity: (state, action: PayloadAction<number>) => {
      state.rowDensity = action.payload;
    },
    setKnittingStitchDensity: (state, action: PayloadAction<number>) => {
      state.stitchDensity = action.payload;
    },
    setKnittingPattern: (state, action: PayloadAction<boolean[][]>) => {
      state.pattern = action.payload;
    },
    togglePattern: (state, action: PayloadAction<[number, number]>) => {
      const [xi, yi] = action.payload;
      state.pattern[yi][xi] = !state.pattern[yi][xi];
    },
  },
});

export const {
  setKnittingHeight,
  setKnittingWidth,
  setKnittingRowDensity,
  setKnittingStitchDensity,
  setKnittingPattern,
  togglePattern,
} = KnittingSlice.actions;

export default KnittingSlice.reducer;
