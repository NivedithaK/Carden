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
    this.child = React.createRef();
  }

  //debuging tools
  componentDidMount() {
    document.addEventListener("contextmenu", this.handleContextMenu);
  }
  //debuging tools
  componentWillUnmount() {
    document.removeEventListener("contextmenu", this.handleContextMenu);
  }
  //debuging tools  
  handleContextMenu = (e) => {
    //possibly have the side menue pop up. fancy
    this.getpos();
    e.preventDefault();
  };

  addComp = (e) => {
    let newcomp;
    let userin = window.prompt("Enter input", "");
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
    let addedcomp = this.state.comps.concat(
      <DragComp
        ref={this.child}
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

  getpos = () => {
    for (let i = 0; i < this.state.comps.length; i++) {
      console.log(this.state.comps[i].getpos(), this.state.comps[i].getpos());
    }
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
            {this.state.comps}
          </Canvas>
        </main>
      </div>
    );
  }
}

export default Create;
