import React, { Component } from "react";
import Canvas from "./canvas";
import DragComp from "./dragComp";
import { Button } from "@chakra-ui/react";
import "./style.css";

class CreateCanvas extends Component {
  constructor() {
    super();
    this.state = {
      styles: [],
      pos: [],
      comps: [],
      id: 0,
    };
  }

  updatePos(id, left, top) {
    let newPos = this.state.pos;
    newPos[id] = { x: left, y: top };
    let newStyles = this.state.styles;
    newStyles[id] = { ...this.state.styles[id], top: top, left: left };
    //change the component that needs to rerender
    let components = this.state.comps;
    components[id] = React.cloneElement(components[id], {
      top: this.state.pos[id].y,
      left: this.state.pos[id].x,
      id: id,
      style: newStyles[id],
    });

    this.setState({
      ...this.state,
      comps: components,
      pos: newPos,
      styles: newStyles,
    });
  }

  addComp = (e) => {
    let newcomp;
    let userin = window.prompt(
      "Enter input (This is temporary, for demo purposes)",
      ""
    );
    if (userin === "" || userin === null) {
      return;
    }
    switch (e.target.value) {
      case "Button":
        newcomp = <Button>{userin}</Button>;
        break;
      case "Text":
        newcomp = <p>{userin}</p>;
        break;
      case "Image":
        newcomp = <img src={userin}></img>;
        break;
    }

    let extendedPos = this.state.pos;
    extendedPos.push({ id: this.state.id, x: 0, y: 0 });

    let extendedStyles = this.state.styles;
    let top = this.state.pos[this.state.id].y;
    let left = this.state.pos[this.state.id].x;
    extendedStyles.push({
      top: top,
      left: left,
      position: "static",
    });

    this.setState({ ...this.state, pos: extendedPos, styles: extendedStyles });
    let addedcomp = this.state.comps.concat(
      <DragComp
        key={this.state.id}
        id={this.state.id}
        className="comp"
        draggable="true"
        style={this.state.styles[this.state.id]}
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
          <Canvas
            id="canvas"
            className="canvas"
            dropable={true}
            changePos={this.updatePos.bind(this)}
          >
            {this.state.comps}
          </Canvas>
        </main>
      </div>
    );
  }
}

export default CreateCanvas;
