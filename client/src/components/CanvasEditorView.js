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
      styles: {},
      pos: {},
      comps: [{}],
      scene: 0,
      id: 0,
    };
  }

  setScene = (i) => {
    this.setState({
      ...this.state,
      scene: i,
    });
  };

  addScene = () => {
    let components = this.state.comps;
    components.push({});
    this.setState({
      ...this.state,
      comps: components,
      scene: components.length-1,
    });
  }

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
    components[this.state.scene][id] = React.cloneElement(
      components[this.state.scene][id],
      {
        top: this.state.pos[id].y,
        left: this.state.pos[id].x,
        id: id,
        style: newStyles[id],
      }
    );
    //save the state
    this.setState({
      ...this.state,
      comps: components,
      pos: newPos,
      styles: newStyles,
    });
  };
  //add component to canvas
  addComp = (e, type, defo=null) => {
    let newcomp;
    let userin;
    //take some user input
    if (defo == null)
    {
      userin = window.prompt(
        "Enter input (This is temporary, for demo purposes)",
        ""
      );
    } else {
      userin = defo;
    }
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
    this.wrapComp(newcomp, 0, 0, "absolute");
  };
   handleBack = () => {
        this.props.history.push("/dashboard");
    };
  loadComp = (entity) => {
    let newcomp = "";
    if (entity.kind == "Text") {
      newcomp = <p>{entity.content}</p>;
    } else if (entity.kind == "Image") {
      newcomp = <img src={entity.link}></img>;
    } else if (entity.kind == "Button") {
      newcomp = <Button>{entity.content}</Button>;
    }
    return this.wrapComp(
      newcomp,
      parseFloat(entity.left),
      parseFloat(entity.top),
      "absolute"
    );
  };

  wrapComp = (newcomp, x, y, position) => {
    let extendedPos = this.state.pos;
    extendedPos[this.state.id] = { x: x, y: y };

    let extendedStyles = this.state.styles;
    let top = this.state.pos[this.state.id].y;
    let left = this.state.pos[this.state.id].x;
    extendedStyles[this.state.id] = {
      top: top,
      left: left,
      position: position,
    };
    let addedcomp = this.state.comps;
    addedcomp[this.state.scene][this.state.id] = (
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
      ...this.state,
      comps: addedcomp,
      id: oldId + 1,
      pos: extendedPos,
      styles: extendedStyles,
    });
    return oldId;
  };

  save = () => {
    console.log(postTemplate(this.state.comps));
  };
  
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
        Promise.all(
          newScenes.map(function (sceneElems) {
            return Promise.all(sceneElems.entities);
          })
        ).then((newScenes) => {
          if (newScenes.length == 0) {
            return;
          }
          self.state = {
            canvasColor: { r: 220, g: 118, b: 118, a: 1 }, //Will have to have different background colors depending on the Canvas
            canvasHeight: 500,
            canvasWidth: 500,
            styles: [],
            pos: [],
            comps: [],
            scene: 0,
            id: 0,
          };
          var sceneNum = 0;
          newScenes.forEach(function (scene) {
            self.state.comps.push({});
            self.state.scene = sceneNum;
            scene.forEach(function (entity) {
              let compId = self.loadComp(entity);
              self.updatePos(
                compId,
                parseFloat(entity.left),
                parseFloat(entity.top)
              );
            });
            sceneNum++;
          });
          this.setState({
            ...this.state,
            scene: 0,
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
          handleBack={this.handleBack}
          load={this.load}
          setScene={this.setScene}
          addScene={this.addScene}
          numScenes={this.state.comps.length}
          currentScene={this.state.scene}
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
          comps={Object.values(this.state.comps[this.state.scene])}
        />
      </Flex>
    );
  }
}

export default CanvasEditorView;
