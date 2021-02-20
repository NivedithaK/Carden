import React, { Component } from "react";
import Canvas from "./canvas";
import DragComp from "./dragComp";

class Create extends Component {
  render() {
    return (
      <div className="App">
        <main className="flexbox">
          <Canvas id="canvas" className="canvas">
            <DragComp id="text-1" className="text-comp" draggable="true">
              <p>Text1</p>
            </DragComp>
            <DragComp id="text-2" className="text-comp" draggable="true">
              <p>Text2</p>
            </DragComp>
            <DragComp id="button-1" className="text-comp" draggable="true">
              <button>Button1</button>
            </DragComp>
          </Canvas>
          <Canvas id="canvas2" className="canvas2">

          </Canvas>
        </main>
      </div>
    );
  }
}

export default Create;
