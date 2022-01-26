import Canvas from "../components/Canvas/Canvas";
import { Provider } from "react-redux";
import store from "../store/store";
import Tools from "../components/Knitting/KnittingTools";

export default function Home() {
  return (
    <Provider store={store}>
      <div className="h-11 lg:h-16">
        <h1 className="text-2xl">Knitting pattern generator</h1>
      </div>
      <div className="flex flex-col lg:flex-row h-screen w-screen" id="main">
        <div className="grow bg-slate-200 flex" id="canvas">
          <Canvas />
        </div>
        <div className="h-52 lg:w-80" id="tools">
          <Tools></Tools>
        </div>
      </div>
    </Provider>
  );
}
