import Canvas from "../components/Canvas/Canvas";
import { useRef } from "react";
import { Provider } from "react-redux";
import store from "../store/store";
import Tools from "../components/Knitting/KnittingTools";

export default function Home() {
  return (
    <Provider store={store}>
      <div className="flex flex-col h-screen w-screen" id="main">
        <div className="grow bg-slate-200 flex" id="canvas">
          <Canvas />
        </div>
        <div className="h-40" id="tools">
          <Tools></Tools>
        </div>
      </div>
    </Provider>
  );
}
