import React, { MouseEventHandler, useEffect, useRef } from "react";
import { setPxPerCm } from "../../store/canvasSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  countFromDensity,
  DENSITY_REF,
  togglePattern,
} from "../../store/knittingSlice";

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
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  const canvasState = useAppSelector((state) => state.canvas);
  const knittingState = useAppSelector((state) => state.knitting);

  const dispatch = useAppDispatch();

  const canvasOnClickHandler: React.MouseEventHandler<HTMLCanvasElement> = (
    e
  ) => {
    e.preventDefault();

    const canvas = canvasContainerRef.current!;

    const deltaWidth = deltaInPxFromDensityInCm(
      knittingState.stitchDensity,
      canvasState.pxPerCm
    );
    const deltaHeight = deltaInPxFromDensityInCm(
      knittingState.rowDensity,
      canvasState.pxPerCm
    );

    const [xi, yi] = posToIndex(
      e.clientX + canvas.scrollLeft - canvas.getBoundingClientRect().left,
      e.clientY + canvas.scrollTop - canvas.getBoundingClientRect().top,
      canvasState.height,
      canvasState.width,
      deltaHeight,
      deltaWidth
    );
    dispatch(togglePattern([xi, yi]));
  };

  useEffect(() => {
    const deltaWidth = deltaInPxFromDensityInCm(
      knittingState.stitchDensity,
      canvasState.pxPerCm
    );
    const deltaHeight = deltaInPxFromDensityInCm(
      knittingState.rowDensity,
      canvasState.pxPerCm
    );
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    ctx.lineWidth = 3;
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
      x += deltaWidth;
    }
    let y = 0;
    while (y <= canvasState.height) {
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.offsetWidth, y);
      y += deltaHeight;
    }
    ctx.stroke();

    const nx = countFromDensity(
      knittingState.stitchDensity,
      knittingState.width
    );
    const ny = countFromDensity(knittingState.rowDensity, knittingState.height);

    ctx.beginPath();
    ctx.fillStyle = "black";
    for (let y = 0; y < ny; y++) {
      for (let x = 0; x < nx; x++) {
        if (knittingState.pattern[y][x])
          ctx.fillRect(
            x * deltaWidth,
            y * deltaHeight,
            deltaWidth,
            deltaHeight
          );
      }
    }
  }, [canvasState, knittingState]);

  return (
    <div
      className="h-full w-full relative overflow-scroll"
      ref={canvasContainerRef}
    >
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
