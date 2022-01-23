import Tools from "../components/Tools";
import Canvas from "../components/Canvas";
import { useRef } from "react";
import { Provider } from "react-redux";
import store from "../store/store";

const initialCanvasHeight = 297;
const initialCanvasWidth = 210;
const initialScale = 4;

export default function Home() {
  const canvasContainerRef = useRef(null);

  // const

  // useEffect(() => {

  // })

  return (
    <Provider store={store}>
      <div className="flex flex-col h-screen w-screen" id="main">
        <div className="grow bg-slate-200 flex" id="canvas">
          <Canvas
            height={initialCanvasHeight * initialScale}
            width={initialCanvasWidth * initialScale}
          ></Canvas>
        </div>
        <div className="h-40" id="tools">
          <Tools></Tools>
        </div>
      </div>
    </Provider>
  );
}
