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
<<<<<<< HEAD
    newPos[id] = {x:left, y:top, type:"absolute"};
    //change the component that needs to rerender
    let components = this.state.comps;
    components[id] = React.cloneElement(components[id], {
      top:this.state.pos[id].y,
      left:this.state.pos[id].x,
      position:this.state.pos[id].type,
      id:id
=======
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
>>>>>>> WEEB-87
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
<<<<<<< HEAD
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
=======

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
>>>>>>> WEEB-87
    let addedcomp = this.state.comps.concat(
      <DragComp
        key={this.state.id}
        id={this.state.id}
        className="comp"
        draggable="true"
<<<<<<< HEAD
        top={this.state.pos[this.state.id].y}
        left={this.state.pos[this.state.id].x}
        position={this.state.pos[this.state.id].type}
=======
        style={this.state.styles[this.state.id]}
>>>>>>> WEEB-87
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
