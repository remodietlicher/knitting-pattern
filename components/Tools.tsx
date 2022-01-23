import React, { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { KnittingState, setKnitting } from "../store/knittingSlice";

const Tools = () => {
  const knitting = useAppSelector((state) => state.knitting);
  const knittingDispatch = useAppDispatch();

  const knittingSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newKnittingState: KnittingState = {
      stitches: +(e.currentTarget.elements[0] as HTMLInputElement).value,
      rows: +(e.currentTarget.elements[1] as HTMLInputElement).value,
      height: +(e.currentTarget.elements[2] as HTMLInputElement).value,
      width: +(e.currentTarget.elements[3] as HTMLInputElement).value,
    };
    knittingDispatch(setKnitting(newKnittingState));
  };

  return (
    <form onSubmit={knittingSubmitHandler}>
      <input type="text" id="stitches" defaultValue={knitting.stitches} />
      <label htmlFor="stitches">stitches per 10 cm</label>
      <input type="text" id="rows" defaultValue={knitting.rows} />
      <label htmlFor="rows">rows per 10 cm</label>
      <input type="text" id="height" defaultValue={knitting.height} />
      <label htmlFor="height">final height in cm</label>
      <input type="text" id="width" defaultValue={knitting.width} />
      <label htmlFor="width">final width in cm</label>
      <button
        className="bg-orange-400 hover:bg-transparent border border-orange-400 text-white hover:text-orange-400 rounded py-2 px-4"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default Tools;
