import { Button } from "@chakra-ui/react";
import React from "react";

class DragComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        ...this.props.styleGetter(this.props.id),
      },
      type: this.props.type,
      className: this.props.className,
      id: this.props.id,
      content: this.props.content.content,
      src: this.props.content.src,
    };
  }

  componentDidMount() {
    this.generateComponent();
  }

  generateComponent() {
    let compStyle = { ...this.state.style };
    compStyle.left = undefined;
    compStyle.top = undefined;
    compStyle.position = "initial";
    let newcomp = null;
    let gotContent = this.props.contentGetter(this.state.id);
    let src = gotContent.src;
    let content = gotContent.content;
    switch (this.state.type) {
      case "Button":
        let onclick = null;
        if (src) {
          onclick = () => {
            let prefix = "";
            if (!src.includes("http://") && !src.includes("https://")) {
              prefix = "http://";
            }
            try {
              window.open(prefix + src, "_blank");
            } catch (e) {
              return;
            }
          };
        }
        if (this.props.getSceneRef(this.state.id)) {
          onclick = () => {
            let sceneref = this.props.getSceneRef(this.state.id);
            sceneref = sceneref.split(" ")[1];
            sceneref = parseInt(sceneref) - 1;
            this.props.sceneSetter(sceneref);
          };
        }
        newcomp = (
          <Button style={compStyle} onClick={onclick}>
            {content}
          </Button>
        );
        break;
      case "Text":
        newcomp = <p style={compStyle}>{content}</p>;
        break;
      case "Image":
        newcomp = (
          <img style={compStyle} src={src} alt="Invalid Image link"></img>
        );
        break;
    }
    this.setState({ ...this.state, comp: newcomp });
  }

  dragStart = (e) => {
    const target = e.target;
    e.dataTransfer.setDragImage(target, "50%", "50%");
    e.dataTransfer.setData("compId", target.id);
    setTimeout(() => {
      this.setState({
        style: {
          ...this.state.style,
          display: "none",
        },
      });
    }, 0);
  };

  dragEnd = (e) => {
    const target = e.target;
    e.dataTransfer.setDragImage(target, "-50%", "-50%");

    setTimeout(() => {
      this.setState({
        style: {
          ...this.state.style,
          display: "block",
          top: this.props.top,
          left: this.props.left,
        },
      });
      this.onClick();
    }, 0);
  };

  changeStyle = (style) => {
    //store the property being changed
    if (typeof style === 'string') {
      style = { fontFamily: style };
    }
    let newStyle = Object.keys(style)[0];
   
    //handle the workaround ;-;
    if (newStyle === "className") {
      this.setState({ ...this.state, className: style[newStyle] });
      return this.state.style;
    }
    //if its a number in string from, convert it
    if (typeof style[newStyle] === "string" && !isNaN(style[newStyle])) {
      style[newStyle] = parseFloat(style[newStyle]);
    }
    let editedStyle = { ...this.state.style, ...style };
    //check if its already in the style in which case toggle it
    if (
      (newStyle === "fontWeight" ||
        newStyle === "fontStyle" ||
        newStyle === "textDecoration") &&
      Object.keys(this.state.style).includes(newStyle) &&
      this.state.style[newStyle] === style[newStyle]
    ) {
      //toggle the three text modifications
      editedStyle[newStyle] = "initial";
    }
    let pureStyle = { ...editedStyle };
    this.props.styleSetter(pureStyle, this.state.id);
    editedStyle.left = undefined;
    editedStyle.top = undefined;
    editedStyle.position = "initial";
    let newComp = React.cloneElement(this.state.comp, {
      style: editedStyle,
    });

    this.setState({
      style: { ...pureStyle },
      comp: newComp,
    });

    return pureStyle;
  };

  onClick = (e) => {
    //open the editor menu according to the type of content
    //for testing, only the text one will show
    if (e) e.preventDefault();
    switch (this.state.type) {
      case "Text":
        this.props.menuSetter({
          property: this.props.displayProperties.text,
          changeFunc: this.changeStyle,
          style: this.state.style,
          id: this.state.id,
          contentChanger: this.changeContent,
          content: this.props.contentGetter,
        });
        break;
      case "Button":
        this.props.menuSetter({
          property: this.props.displayProperties.button,
          changeFunc: this.changeStyle,
          style: this.state.style,
          id: this.state.id,
          contentChanger: this.changeContent,
          content: this.props.contentGetter,
          currentScene: this.props.getSceneRef(this.state.id),
          callback: (scene) => {
            this.props.setSceneRef(this.state.id, scene);
            this.setState(
              {
                ...this.state,
                content: { ...this.state.content, src: undefined },
              },
              this.generateComponent
            );
            //change on click
          },
          options: () => {
            let pages = [];
            for (let i = 1; i <= this.props.scenes(); i++) {
              pages = pages.concat("Page " + i);
            }
            return pages;
          },
        });
        break;
      case "Image":
        this.props.menuSetter({
          property: this.props.displayProperties.img,
          changeFunc: this.changeStyle,
          style: this.state.style,
          id: this.state.id,
          contentChanger: this.changeContent,
          content: this.props.contentGetter,
        });
        break;
    }
  };

  changeContent = (newContent = undefined, src = undefined) => {
    let updatedContent = {};
    if (newContent !== undefined) {
      updatedContent = { content: newContent };
    }
    if (src !== undefined) {
      updatedContent = { ...updatedContent, src: src };
    }
    this.props.contentSetter(
      updatedContent,
      this.state.id,
      this.generateComponent.bind(this)
    );
  };

  render() {
    return (
      <div
        id={this.props.id}
        draggable={this.props.draggable}
        onDragStart={this.dragStart}
        onDragEnd={this.dragEnd}
        onDragEnter={this.dragEnter}
        onDragLeave={this.dragLeave}
        onDrop={this.props.changedDrop ? this.props.changedDrop : undefined}
        onContextMenu={this.onClick}
        className={this.state.className}
        style={this.state.style}
      >
        {this.state.comp}
      </div>
    );
  }
}

export default DragComp;
