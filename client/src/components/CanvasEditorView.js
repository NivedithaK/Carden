import React, { Component } from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import { ThickHDivider } from "./EditorMenuItems.js";
import CanvasEditorHeader from "./CanvasEditorHeader.js";
import CanvasEditorBottom from "./CanvasEditorBottom.js";
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

  propertySetter(setterFunction, properties) {
    this.setState({
      ...this.state,
      propertySetter: setterFunction,
      properties: properties,
    });
  }

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
    newStyles[id] = { ...this.state.styles[id], top: top, left: left};
    //change the component that needs to rerender
    let components = this.state.comps;
    //"reprop" the component because render cannot rerender an array
    components[id] = React.cloneElement(components[id], {
      top: this.state.pos[id].y,
      left: this.state.pos[id].x,
      id: id,
      style: newStyles[id],
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
    let newcomp;
    //take some user input
    let userin = window.prompt(
      "Enter input (This is temporary, for demo purposes)",
      ""
    );
    //dont make a component if cancel or nothing inputed
    if (userin === "" || userin === null) {
      return;
    }
    //make the appropriate object
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

    let extendedPos = this.state.pos;
    extendedPos.push({ id: this.state.id, x: 0, y: 0 });

    let extendedStyles = this.state.styles;
    let top = this.state.pos[this.state.id].y;
    let left = this.state.pos[this.state.id].x;
    extendedStyles.push({
      top: top,
      left: left,
      position: "absolute",
      fontSize:12
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
        {newcomp}
      </DragComp>
    );
    //update all the things in the state
    this.setState({
      comps: addedcomp,
      id: this.state.id + 1,
    });
  };

  render() {
    return (
      <Flex direction="column" h="100vh" width="100%" overflow="scroll">
        <CanvasEditorHeader flex="6" w="100%" zIndex={5} />
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
        />
      </Flex>
    );
  }
}

export default CanvasEditorView;
