import { useEffect, useRef } from "react";

interface CanvasProps {
  height: number;
  width: number;
}

const Canvas: React.FC<CanvasProps> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    ctx.lineWidth = 20;
    ctx.strokeStyle = "black";
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    ctx.strokeRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
  }, [props]);

  return (
    <div className="h-full w-full relative overflow-scroll">
      <canvas
        className="absolute"
        height={props.height}
        width={props.width}
        ref={canvasRef}
      ></canvas>
    </div>
  );
};

export default Canvas;
