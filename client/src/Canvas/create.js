import React, { Component } from "react";
import Canvas from "./canvas";
import DragComp from "./dragComp";
import { Button } from "@chakra-ui/react";
import "./style.css";

class CreateCanvas extends Component {
  constructor() {
    super();
    this.state = {
      pos: [],
      comps: [],
      id: 0,
    };
  }

  updatePos(id, left, top){
    let newPos = this.state.pos;
    newPos[id] = {x:left, y:top};
    //change the component that needs to rerender
    let components = this.state.comps;
    components[id] = React.cloneElement(components[id], {
      top:this.state.pos[id].y,
      left:this.state.pos[id].x,
      id:id
    });
    this.setState({...this.state, comps: components, pos: newPos});
  }

  addComp = (e) => {
    let newcomp;
    let userin = window.prompt("Enter input (This is temporary, for demo purposes)", "");
    if(userin === "" || userin === null){
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
    extendedPos.push({id:this.state.id, x:0, y:0});
    this.setState({pos: extendedPos});
    let addedcomp = this.state.comps.concat(
      <DragComp
        key={this.state.id}
        id={this.state.id}
        className="comp"
        draggable="true"
        top={this.state.pos[this.state.id].y}
        left={this.state.pos[this.state.id].x}
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
          <Canvas id="canvas" className="canvas" dropable={true} changePos={this.updatePos.bind(this)}>
            {this.state.comps}
          </Canvas>
        </main>
      </div>
    );
  }
}

export default CreateCanvas;
