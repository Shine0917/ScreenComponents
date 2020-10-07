import React, { useEffect } from "react";
import { Button } from "antd";

import Marque from "./marque";
import "./App.css";
// import "antd/dist/antd.css";

function App() {
  useEffect(() => {
    document.getElementById("btn-native").addEventListener("click", (e) => {
      console.log("原生e :>> ", e);
      console.log("原生事件执行");
    });
  }, []);
  const handleClick = (e) => {
    console.log("button click :>> ", e);
  };

  const handleNativeClick = (e) => {
    console.log("e :>> ", e.currentTarget);
    console.log("e.native :>> ", e.nativeEvent);
    console.log("react+ 原生事件执行 :>> ");
  };
  return (
    <div className="App">
      <div className="pageIndex">
        <p>react event!!!</p>
        <Button type="primary">Button</Button>

        <button id="btn-confirm" onClick={handleClick}>
          react 事件
        </button>
        <button id="btn-native" onClick={handleNativeClick}>
          原生事件
        </button>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <button id="open">打开弹窗</button>
        <Marque
          text="滚动起来吧，一起滚动吧"
          width={30}
          style={{
            color: "pink",
            textAlign: "center",
            backgroundColor: "black",
          }}
        ></Marque>
      </div>
    </div>
  );
}

export default App;
