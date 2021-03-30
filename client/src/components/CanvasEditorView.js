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
      comps: [{}],
      scene: 0,
      id: 0,
      content: {},
      sceneRef: {},
      classNames: {},
    };
  }

  styleGetter = (id) => {
    return this.state.styles[id];
  };

  styleSetter = (newStyle, id) => {
    let tmpStyle = this.state.styles;
    tmpStyle[id] = { ...newStyle };
    this.setState({ ...this.state, styles: tmpStyle });
  };

  contentSetter = (newContent, id, callback) => {
    let tmpContent = this.state.content;
    tmpContent[id] = { ...tmpContent[id], ...newContent };
    let components = this.state.comps;
    components[this.state.scene][id] = React.cloneElement(
      components[this.state.scene][id],
      {
        top: this.state.styles[id].top,
        left: this.state.styles[id].left,
        id: id,
        content: tmpContent[id],
      }
    );
    let sceneref = this.state.sceneRef;
    if (
      Object.keys(newContent).includes("src") &&
      Object.keys(newContent).includes(id)
    ) {
      delete sceneref[id];
    }
    this.setState(
      {
        ...this.state,
        content: tmpContent,
        comps: components,
        sceneRef: sceneref,
      },
      () => {
        callback();
      }
    );
  };

  propertySetter(setterFunction, properties) {
    this.setState({
      ...this.state,
      propertySetter: setterFunction,
      properties: properties,
    });
  }

  deleteComponent = (id) => {
    let tmpStyles = this.state.styles;
    let tmpComps = this.state.comps;
    let tmpContent = this.state.content;
    let tmpSceneRef = this.state.sceneRef;
    let tmpClassNames = this.state.classNames;
    delete tmpClassNames[id];
    delete tmpContent[id];
    delete tmpStyles[id];
    delete tmpComps[this.state.scene][id];
    if (Object.keys(tmpSceneRef).includes(String(id))) {
      delete tmpSceneRef[id];
    }
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
      comps: tmpComps,
      content: tmpContent,
      sceneRef: tmpSceneRef,
      classNames: tmpClassNames,
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

  setScene = (i) => {
    this.state.propertySetter({
      property: this.state.properties.default,
      changeFunc: undefined,
      style: null,
      id: null,
      contentChanger: null,
    });
    this.setState({
      ...this.state,
      scene: i,
    });
  };

  addScene = () => {
    this.state.propertySetter({
      property: this.state.properties.default,
      changeFunc: undefined,
      style: null,
      id: null,
      contentChanger: null,
    });
    let components = this.state.comps;
    components.push({});
    this.setState({
      ...this.state,
      comps: components,
      scene: components.length - 1,
    });
  };

  //update the position of a child component
  updatePos = (id, left, top) => {
    if (!id) return;
    //store the new position of the component
    let newStyles = this.state.styles;
    newStyles[id] = { ...this.state.styles[id], top: top, left: left };
    //change the component that needs to rerender
    let components = this.state.comps;
    //"reprop" the component because render cannot rerender an array
    components[this.state.scene][id] = React.cloneElement(
      components[this.state.scene][id],
      {
        top: top,
        left: left,
        id: id,
        style: { ...this.state.styles[id], top: top, left: left },
      }
    );
    //save the state
    this.setState({
      ...this.state,
      comps: components,
      styles: newStyles,
    });
  };
  //add component to canvas

  handleBack = () => {
    this.props.history.push("/dashboard");
  };
  loadComp = (entity) => {
    let newcomp = "";
    if (entity.kind === "Text") {
      newcomp = <p>{entity.content}</p>;
    } else if (entity.kind === "Image") {
      newcomp = <img src={entity.link}></img>;
    } else if (entity.kind === "Button") {
      newcomp = <Button>{entity.content}</Button>;
    }
    return this.addComp(
      null,
      parseFloat(entity.left),
      parseFloat(entity.top),
      entity.kind
    );
  };
  ////////////////////////////////////////////////////////////////////

  addComp = (e, x, y, type) => {
    let extendedClasses = this.state.classNames;
    extendedClasses[this.state.id] = "comp";
    let extendedStyles = this.state.styles;
    let top = y;
    let left = x;
    extendedStyles[this.state.id] = {
      top: top,
      left: left,
      position: "absolute",
      fontSize: 12,
      display: "block",
      height: 30,
      width: 100,
    };
    let extendedContent = this.state.content;
    extendedContent[this.state.id] = {
      content: "Input Content",
      src: "Input Source",
    };

    let addedcomp = this.state.comps;
    addedcomp[this.state.scene][this.state.id] = (
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
        content={this.state.content[this.state.id]}
        contentSetter={this.contentSetter}
        contentGetter={(id) => {
          return this.state.content[id];
        }}
        styleSetter={this.styleSetter}
        styleGetter={this.styleGetter}
        scenes={
          type === "Button"
            ? () => {
                return this.state.comps.length;
              }
            : undefined
        }
        getSceneRef={
          type === "Button"
            ? (id) => {
                return this.state.sceneRef[id];
              }
            : undefined
        }
        setSceneRef={
          type === "Button"
            ? (id, scene) => {
                let newSceneref = this.state.sceneRef;
                if (scene !== "Select Page")
                  newSceneref = { ...this.state.sceneRef, [id]: scene };
                this.setState({
                  ...this.state,
                  sceneRef: newSceneref,
                  content: {
                    ...this.state.content,
                    [id]: { ...this.state.content[id], src: "Input Source" },
                  },
                });
              }
            : undefined
        }
        sceneSetter={this.setScene}
        getclass={(id) => {
          return this.state.classNames[id];
        }}
        setclass={(id, newclass) => {
          this.setState({
            ...this.state,
            classNames: { ...this.state.classNames, [id]: newclass },
          });
        }}
      ></DragComp>
    );

    //update all the things in the state
    let oldId = this.state.id;
    this.setState({
      ...this.state,
      comps: addedcomp,
      id: oldId + 1,
      styles: extendedStyles,
      content: extendedContent,
      classNames: extendedClasses,
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
          changedDrop={this.drop}
          addComp={this.addComp}
          changeSetter={this.propertySetter.bind(this)}
          deleteComp={this.deleteComponent}
          comps={Object.values(this.state.comps[this.state.scene])}
        />
      </Flex>
    );
  }
}

export default CanvasEditorView;
