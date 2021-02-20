import React, { Component } from "react";
import Canvas from "./canvas";
import DragComp from "./dragComp";
import { Button } from "@chakra-ui/react";

class Create extends Component {
  constructor() {
    super();
    this.state = {
      comps: [],
      id: 0,
    };
  }

  render() {
    return (
      <div className="App">
        <main className="flexbox">
          <button onClick={this.addText}>click me</button>

          {/* <Canvas id="canvas" className="canvas">

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
          </Canvas> */}
          <Canvas id="canvas" className="canvas">
            {this.state.comps}

          </Canvas>
        </main>
      </div>
    );
  }


  addText = () => {
    this.state.comps.push(
      <DragComp key={this.state.id} id={this.state.id} className="text-comp" draggable="true">
        <Button>hello{this.state.id}</Button>
      </DragComp>
    );
    this.state.id++;
    this.forceUpdate();
    console.log(this.state.comps);
  };

}

export default Create;
