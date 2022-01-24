import { MouseEventHandler, useEffect, useRef } from "react";
import { useAppSelector } from "../../store/hooks";
import { DENSITY_REF } from "../../store/knittingSlice";

const posToIndex = (
  x: number,
  y: number,
  height: number,
  width: number,
  deltaHeight: number,
  deltaWidth: number
) => {
  const xi = Math.floor(Math.min(x, width) / deltaWidth);
  const yi = Math.floor(Math.min(y, height) / deltaHeight);

  return [xi, yi];
};

const deltaInPxFromDensityInCm = (densityInCm: number, pxPerCm: number) => {
  return Math.ceil((DENSITY_REF * pxPerCm) / densityInCm);
};

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const canvasState = useAppSelector((state) => state.canvas);
  const knittingState = useAppSelector((state) => state.knitting);

  const canvasOnClickHandler: MouseEventHandler<HTMLCanvasElement> = (
    e: React.MouseEvent
  ) => {
    e.preventDefault();

    const deltaWidth = deltaInPxFromDensityInCm(
      knittingState.stitchDensity,
      canvasState.pxPerCm
    );
    const deltaHeight = deltaInPxFromDensityInCm(
      knittingState.rowDensity,
      canvasState.pxPerCm
    );

    const [xi, yi] = posToIndex(
      e.clientX,
      e.clientY,
      canvasState.height,
      canvasState.width,
      deltaHeight,
      deltaWidth
    );

    console.log(canvasState);
    console.log(knittingState);
    console.log(xi, yi);
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(xi * deltaWidth, yi * deltaHeight, deltaWidth, deltaHeight);
  };

  useEffect(() => {
    const stitchWidthInPx = deltaInPxFromDensityInCm(
      knittingState.stitchDensity,
      canvasState.pxPerCm
    );
    const rowHeightInPx = deltaInPxFromDensityInCm(
      knittingState.rowDensity,
      canvasState.pxPerCm
    );
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    ctx.lineWidth = Math.ceil(Math.min(stitchWidthInPx, rowHeightInPx) / 10);

    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";

    // clear rectangle
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();

    // draw backgroud
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw grid
    let x = 0;
    while (x <= canvasState.width) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.offsetHeight);
      x += stitchWidthInPx;
    }
    let y = 0;
    while (y <= canvasState.height) {
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.offsetWidth, y);
      y += rowHeightInPx;
    }
    ctx.stroke();
  }, [canvasState, knittingState]);

  return (
    <div className="h-full w-full relative overflow-scroll">
      <canvas
        className="absolute"
        height={canvasState.height}
        width={canvasState.width}
        ref={canvasRef}
        onClick={canvasOnClickHandler}
      ></canvas>
    </div>
  );
};

export default Canvas;
