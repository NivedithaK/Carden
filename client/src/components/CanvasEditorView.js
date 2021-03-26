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
      content: [],
      id: 0,
    };
  }

  propertySetter(setterFunction, properties) {
    this.setState({
      ...this.state,
      propertySetter: setterFunction,
      properties: properties,
    });
  }

  deleteComponent = (id) => {
    let tmpStyles = this.state.styles;
    let tmpPos = this.state.pos;
    let tmpComps = this.state.comps;
    tmpStyles[id] = undefined;
    tmpPos[id] = undefined;
    tmpComps[id] = undefined;
    this.state.propertySetter({
      property: this.state.properties.default,
      changeFunc: undefined,
      style: null,
      id: null,
      contentChanger: null,
    });
    this.setState({
      ...this.state,
      styles: tmpStyles,
      pos: tmpPos,
      comps: tmpComps,
    });
  };

  drop = (e) => {
    e.preventDefault();
    let comp_id = e.dataTransfer.getData("compId");
    let canvasComp = document.getElementById("canvas");
    let rect = canvasComp.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top; //y position within the element.
    this.updatePos(comp_id, x, y);
  };

  //update the position of a child component
  updatePos = (id, left, top) => {
    if (!id) return;
    //store the new position of the component
    let newPos = this.state.pos;
    newPos[id] = { x: left, y: top };
    let newStyles = this.state.styles;
    newStyles[id] = { ...this.state.styles[id], top: top, left: left };
    //change the component that needs to rerender
    let components = this.state.comps;
    //"reprop" the component because render cannot rerender an array
    components[id] = React.cloneElement(components[id], {
      top: top,
      left: left,
      id: id,
      style: { ...this.state.styles[id], top: top, left: left },
    });
    //save the state
    this.setState({
      ...this.state,
      comps: components,
      pos: newPos,
      styles: newStyles,
    });
  };
  //add component to canvas
  addComp = (e, type) => {
    let extendedPos = this.state.pos;
    extendedPos.push({ id: this.state.id, x: x, y: y });

    let extendedStyles = this.state.styles;
    let top = this.state.pos[this.state.id].y;
    let left = this.state.pos[this.state.id].x;
    extendedStyles.push({
      top: top,
      left: left,
      position: "absolute",
      fontSize: 12,
    });
    this.setState({ ...this.state, pos: extendedPos, styles: extendedStyles });

    let addedcomp = this.state.comps.concat(
      <DragComp
        key={this.state.id}
        id={this.state.id}
        className="comp"
        draggable="true"
        style={this.state.styles[this.state.id]}
        changedDrop={this.drop}
        menuSetter={this.state.propertySetter}
        displayProperties={this.state.properties}
        type={type}
      >
      </DragComp>
    );
    //update all the things in the state
    this.setState({
      ...this.state,
      comps: addedcomp,
      id: oldId + 1,
      pos: extendedPos,
      styles: extendedStyles,
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
    let templateId = window.prompt(
      "Enter template id (TODO hookup to template browser instead of prompt)",
      ""
    );
    let template = loadTemplate(templateId);
    let self = this;
    Promise.resolve(template).then((newTemplate) => {
      if (newTemplate.numScenes == 0) {
        return;
      }
      Promise.all(newTemplate.scenes).then((newScenes) => {
        if (newScenes.length == 0) {
          return;
        }
        Promise.all(newScenes[0].entities).then((newEntities) => {
          self.state = {
            canvasColor: { r: 220, g: 118, b: 118, a: 1 }, //Will have to have different background colors depending on the Canvas
            canvasHeight: 500,
            canvasWidth: 500,
            styles: [],
            pos: [],
            comps: [],
            id: 0,
          };
          newEntities.forEach(function (entity) {
            let compId = self.loadComp(entity);
            self.updatePos(compId, parseFloat(entity.left), parseFloat(entity.top));
          });
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
          changedDrop={this.drop}
          addComp={this.addComp}
          comps={this.state.comps}
          changeSetter={this.propertySetter.bind(this)}
          deleteComp={this.deleteComponent}
        />
      </Flex>
    );
  }
}

export default CanvasEditorView;
