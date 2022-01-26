import React, { useState } from "react";
import { setDimsCm, setPxPerCm } from "../../store/canvasSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  countFromDensity,
  setKnittingHeight,
  setKnittingPattern,
  setKnittingRowDensity,
  setKnittingStitchDensity,
  setKnittingWidth,
} from "../../store/knittingSlice";
import NumberInput from "../FormElements/NumberInput";
import SubmitButton from "../FormElements/SubmitButton";

const KnittingTools = () => {
  const knittingState = useAppSelector((state) => state.knitting);
  const canvasState = useAppSelector((state) => state.canvas);
  const dispatch = useAppDispatch();

  const [stitchDensityForm, setStitchDensityForm] = useState(
    knittingState.stitchDensity
  );
  const [rowDensityForm, setRowDensityForm] = useState(
    knittingState.rowDensity
  );
  const [heightForm, setHeightForm] = useState(knittingState.height);
  const [widthForm, setWidthForm] = useState(knittingState.width);
  const [pxPerCmForm, setPxPerCmForm] = useState(canvasState.pxPerCm);

  const knittingSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nx = knittingState.pattern[0].length;
    const ny = knittingState.pattern.length;

    const newNy = Math.max(countFromDensity(rowDensityForm, heightForm), ny);
    const newNx = Math.max(countFromDensity(stitchDensityForm, widthForm), nx);

    const newPattern = Array.from(Array(newNy), (_) =>
      Array(newNx).fill(false)
    );

    for (let y = 0; y < ny; y++) {
      for (let x = 0; x < nx; x++) {
        newPattern[y][x] = knittingState.pattern[y][x];
      }
    }

    dispatch(setKnittingHeight(heightForm));
    dispatch(setKnittingWidth(widthForm));
    dispatch(setKnittingRowDensity(rowDensityForm));
    dispatch(setKnittingStitchDensity(stitchDensityForm));
    dispatch(setKnittingPattern(newPattern));
    dispatch(setDimsCm({ widthInCm: widthForm, heightInCm: heightForm }));
    dispatch(setPxPerCm(pxPerCmForm));
  };

  return (
    <form onSubmit={knittingSubmitHandler}>
      <NumberInput
        text="stitches per 10 cm"
        defaultValue={knittingState.stitchDensity}
        changeHandler={(e: React.ChangeEvent<HTMLInputElement>) => {
          setStitchDensityForm(+e.currentTarget.value);
        }}
      />
      <NumberInput
        text="rows per 10 cm"
        defaultValue={knittingState.rowDensity}
        changeHandler={(e: React.ChangeEvent<HTMLInputElement>) => {
          setRowDensityForm(+e.currentTarget.value);
        }}
      />
      <NumberInput
        text="final height in cm"
        defaultValue={knittingState.height}
        changeHandler={(e: React.ChangeEvent<HTMLInputElement>) => {
          setHeightForm(+e.currentTarget.value);
        }}
      />
      <NumberInput
        text="final width in cm"
        defaultValue={knittingState.width}
        changeHandler={(e: React.ChangeEvent<HTMLInputElement>) => {
          setWidthForm(+e.currentTarget.value);
        }}
      />
      <NumberInput
        text="Pixel density (px/cm)"
        defaultValue={canvasState.pxPerCm}
        changeHandler={(e: React.ChangeEvent<HTMLInputElement>) => {
          setPxPerCmForm(+e.currentTarget.value);
        }}
      />
      <SubmitButton>Submit</SubmitButton>
    </form>
  );
};

export default KnittingTools;
