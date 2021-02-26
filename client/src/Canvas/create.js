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

  addComp = (e) => {
    let newcomp;
    switch (e.target.value) {
      case "Button":
        newcomp = <Button>{this.state.id}</Button>;
        break;
      case "Text":
        newcomp = <p>{this.state.id}</p>;
        break;
      case "Image":
        newcomp = (
          <img src="https://i.pinimg.com/474x/b7/41/33/b74133de4d835fb9ff4ab54e06f04c87.jpg"></img>
        );
        break;
    }
    let addedcomp = this.state.comps.concat(
      <DragComp
        key={this.state.id}
        id={this.state.id}
        className="comp"
        draggable="true"
      >
        {newcomp}
      </DragComp>
    );

    this.setState({
      comps: addedcomp,
      id: this.state.id + 1,
    });
  };

  render() {
    return (
      <div className="App">
        <main className="flexbox">
          <Canvas id="pallet" className="pallet" dropable={false}>
            <Button value="Button" onClick={this.addComp}>
              Button
            </Button>
            <Button value="Text" onClick={this.addComp}>
              Text
            </Button>
            <Button value="Image" onClick={this.addComp}>
              Image
            </Button>
          </Canvas>
          <Canvas id="canvas" className="canvas" dropable={true}>
            <DragComp draggable="true" id="text" className="comp">
              UwU
            </DragComp>
            {this.state.comps}
          </Canvas>
        </main>
      </div>
    );
  }
}

export default Create;
