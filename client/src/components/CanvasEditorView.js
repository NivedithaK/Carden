import React, { Component } from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import { ThickHDivider } from "./EditorMenuItems.js";
import CanvasEditorHeader from "./CanvasEditorHeader.js";
import CanvasEditorBottom from "./CanvasEditorBottom.js";
import { postTemplate, loadTemplate } from "../actions/cardActions";
import DragComp from "../Canvas/dragComp";

class CanvasEditorView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasColor: { r: 220, g: 118, b: 118, a: 1 }, //Will have to have different background colors depending on the Canvas
      canvasHeight: 500,
      canvasWidth: 500,
      styles: [],
      pos: [],
      comps: [],
      id: 0,
    };
  }

  updatePos = (id, left, top) => {
    console.log(left, top);
    if (!id) return;

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
  };

  addComp = (e, type) => {
    let newcomp;
    let userin = window.prompt(
      "Enter input (This is temporary, for demo purposes)",
      ""
    );
    if (userin === "" || userin === null) {
      return;
    }
    switch (type) {
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
    this.wrapComp(newcomp, 0, 0, "absolute");
  }

  loadComp = (entity) => {
    let newcomp = "";
    if (entity.kind == "Text") {
      newcomp = <p>{entity.content}</p>
    } else if (entity.kind == "Image") {
      newcomp = <img src={entity.link}></img>
    } else if (entity.kind == "Button") {
      newcomp = <Button>{entity.content}</Button>;
    }
    return this.wrapComp(newcomp, entity.left, entity.top, "absolute");
  };

  wrapComp = (newcomp, x, y, position) => {
    let extendedPos = this.state.pos;
    extendedPos.push({ id: this.state.id, x: x, y: y });

    let extendedStyles = this.state.styles;
    let top = this.state.pos[this.state.id].y;
    let left = this.state.pos[this.state.id].x;
    extendedStyles.push({
      top: top,
      left: left,
      position: position,
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

    let oldId = this.state.id;
    this.setState({
      comps: addedcomp,
      id: oldId + 1,
    });
    return oldId;
  };

  
  save = () => {
    postTemplate(this.state.comps);
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
            let compId = self.loadComp(entity);
            self.updatePos(compId, entity.left, entity.top);
          })
        });
      });
    });
  };

  render() {
    return (
      <Flex direction="column" h="100vh" width="100%" overflow="scroll">
        <CanvasEditorHeader 
          flex="6" 
          w="100%" 
          zIndex={5}
          save={this.save}
          load={this.load}
        />
        <ThickHDivider flex="0.3" colorstring={"palette.800"} />
        <CanvasEditorBottom
          flex="93.7"
          canvasColorSetter={(color) => this.setState({ canvasColor: color })}
          canvasWidthHook={(width) => this.setState({ canvasWidth: width })}
          canvasHeightHook={(height) => this.setState({ canvasHeight: height })}
          canvasColor={`rgba(${this.state.canvasColor.r}, ${this.state.canvasColor.g}, ${this.state.canvasColor.b}, ${this.state.canvasColor.a})`}
          canvasWidth={this.state.canvasWidth}
          canvasHeight={this.state.canvasHeight}
          updatePos={this.updatePos}
          addComp={this.addComp}
          comps={this.state.comps}
        />
      </Flex>
    );
  }
}

export default CanvasEditorView;
