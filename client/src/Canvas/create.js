import React, { Component } from "react";
import Canvas from "./canvas";
import DragComp from "./dragComp";
import { Button } from "@chakra-ui/react";
import "./style.css";

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
          <button onClick={this.addButton}>Add button</button>

          {/* <Canvas id="canvas" className="canvas">
          </Canvas> */}
          <Canvas id="canvas" className="canvas">
            {this.state.comps}
          </Canvas>
        </main>
      </div>
    );
  }

  addButton = () => {
    this.state.comps.push(
      <DragComp
        key={this.state.id}
        id={this.state.id}
        className="text-comp"
        draggable="true"
      >
        <Button>hello{this.state.id}</Button>
      </DragComp>
    );
    this.state.id++;
    this.forceUpdate();
    console.log(this.state.comps);
  };
}

export default Create;
