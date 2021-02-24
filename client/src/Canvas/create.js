import React, { Component } from "react";
import Canvas from "./canvas";
import DragComp from "./dragComp";
import "./style.css";

class Create extends Component {

  constructor() {
    super();
    this.state = {
      comps: [],
    };
  }

  render() {
    return (
      <div className="App">
        <main className="flexbox">
          <Canvas id="canvas" className="canvas">
            <DragComp draggable="true" id="text" className="text">UwU</DragComp>
            {this.state.comps}
          </Canvas>
        </main>
      </div>
    );
  }

}

export default Create;
