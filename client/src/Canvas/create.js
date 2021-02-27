import React, { Component } from "react";
import Canvas from "./canvas";
import DragComp from "./dragComp";
import { Button } from "@chakra-ui/react";
import { postTemplate } from "../actions/cardActions";
import "./style.css";

class CreateCanvas extends Component {
  constructor() {
    super();
    this.state = {
      comps: [],
      id: 0,
      ids: []
    };
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

    this.state.ids.push(this.state.id);

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
            <Button onClick={this.save}>
              save
            </Button>
          </Canvas>
          <Canvas id="canvas" className="canvas" dropable={true}>
            {this.state.comps}
          </Canvas>
        </main>
      </div>
    );
  }

  //TODO Change this to avoid using document.getElementById()
  save = () => {
    var tops = [];
    var lefts = [];
    this.state.ids.forEach(function(id) {
      tops.push(document.getElementById(id).style.top);
      lefts.push(document.getElementById(id).style.left);
    });
    postTemplate(this.render().props.children.props.children[1], tops, lefts);
  };
}

export default CreateCanvas;
