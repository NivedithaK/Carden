import React, { Component } from "react";
import Canvas from "./canvas";
import DragComp from "./dragComp";
import { Button } from "@chakra-ui/react";
import { postTemplate, loadTemplate } from "../actions/cardActions";
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
    newPos[id] = {x:left, y:top, type:"absolute"};
    //change the component that needs to rerender
    let components = this.state.comps;
    components[id] = React.cloneElement(components[id], {
      top:this.state.pos[id].y,
      left:this.state.pos[id].x,
      position:this.state.pos[id].type,
      id:id
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
    this.wrapComp(newcomp, 0, 0, "");
  };

  //TODO add entity types other than textfields
  loadComp = (content, x, y, type) => {
    return this.wrapComp(<p>{content}</p>, x, y, type);
  };

  wrapComp = (newcomp, x, y, type) => {
    let extendedPos = this.state.pos;
    extendedPos.push({id:this.state.id, x:x, y:y, type:type});
    this.setState({pos: extendedPos});
    let addedcomp = this.state.comps.concat(
      <DragComp
        key={this.state.id}
        id={this.state.id}
        className="comp"
        draggable="true"
        top={this.state.pos[this.state.id].y}
        left={this.state.pos[this.state.id].x}
        position={this.state.pos[this.state.id].type}
      >
        {newcomp}
      </DragComp>
    );

    let oldId = this.state.id;
    this.setState({
      comps: addedcomp,
      id: oldId + 1,
    });
    return oldId;
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
              Save
            </Button>
            <Button onClick={this.load}>
              Load
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
  };

  save = () => {
    postTemplate(this.render().props.children.props.children[1]);
  };

  //TODO Add parsing for multiple scenes
  //TODO Add error catching if template id is invalid
  //TODO Correctly load non-absolute components
  load = () => {
    let templateId = window.prompt("Enter template id (TODO hookup to template browser instead of prompt)", "");
    let template = loadTemplate(templateId);
    let self = this;
    Promise.resolve(template).then((newTemplate) => {
      Promise.all(newTemplate.scenes).then((newScenes) => {
        Promise.all(newScenes[0].entities).then((newEntities) => {
          newEntities.forEach(function(entity) {
            let compId = self.loadComp(entity.content, entity.left, entity.top, "absolute");
            self.updatePos(compId, entity.left, entity.top);
          })
        });
      });
    });
  };
}

export default CreateCanvas;
