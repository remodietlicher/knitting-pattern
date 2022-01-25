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

const KnittingTools = () => {
  const knittingState = useAppSelector((state) => state.knitting);
  const canvasState = useAppSelector((state) => state.canvas);
  const dispatch = useAppDispatch();

  const knittingSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const stitchDensity = +(e.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const rowDensity = +(e.currentTarget.elements[1] as HTMLInputElement).value;
    const height = +(e.currentTarget.elements[2] as HTMLInputElement).value;
    const width = +(e.currentTarget.elements[3] as HTMLInputElement).value;
    const pxPerCm = +(e.currentTarget.elements[4] as HTMLInputElement).value;

    const nx = knittingState.pattern[0].length;
    const ny = knittingState.pattern.length;

    const newNy = Math.max(countFromDensity(rowDensity, height), ny);
    const newNx = Math.max(countFromDensity(stitchDensity, width), nx);

    const newPattern = Array.from(Array(newNy), (_) =>
      Array(newNx).fill(false)
    );

    for (let y = 0; y < ny; y++) {
      for (let x = 0; x < nx; x++) {
        newPattern[y][x] = knittingState.pattern[y][x];
      }
    }

    dispatch(setKnittingHeight(height));
    dispatch(setKnittingWidth(width));
    dispatch(setKnittingRowDensity(rowDensity));
    dispatch(setKnittingStitchDensity(stitchDensity));
    dispatch(setKnittingPattern(newPattern));
    dispatch(setDimsCm({ widthInCm: width, heightInCm: height }));
    dispatch(setPxPerCm(pxPerCm));
  };

  return (
    <form onSubmit={knittingSubmitHandler}>
      <input
        type="text"
        id="stitch-density"
        defaultValue={knittingState.stitchDensity}
      />
      <label htmlFor="stitch-density">stitches per 10 cm</label>
      <input
        type="text"
        id="row-density"
        defaultValue={knittingState.rowDensity}
      />
      <label htmlFor="row-density">rows per 10 cm</label>
      <input type="text" id="height" defaultValue={knittingState.height} />
      <label htmlFor="height">final height in cm</label>
      <input type="text" id="width" defaultValue={knittingState.width} />
      <label htmlFor="width">final width in cm</label>
      <input type="text" id="px-per-cm" defaultValue={canvasState.pxPerCm} />
      <label htmlFor="px-per-cm">Pixel density (px/cm)</label>
      <button
        className="bg-orange-400 hover:bg-transparent border border-orange-400 text-white hover:text-orange-400 rounded py-2 px-4"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default KnittingTools;
