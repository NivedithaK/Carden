import { omitThemingProps } from "@chakra-ui/react";
import React from "react";

class DragComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //top and left are place holders
      style: {
        ...this.props.style,
        display: "block",
        top: this.props.top,
        left: this.props.left,
      },
      type: this.props.type,
      className: this.props.className,
      comp: this.props.children,
    };
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
    let newStyle = Object.keys(style)[0];
    let compStyle = null;
    //handle the workaround ;-;
    if (newStyle === "className") {
      this.setState({ ...this.state, className: style[newStyle] });
      return this.state.style;
    }
    //if its a number in string from, convert it
    if (typeof style[newStyle] && !isNaN(style[newStyle])) {
      style[newStyle] = parseFloat(style[newStyle]);
    }
    let editedStyle = null;
    //check if its already in the style in which case toggle it
    if (
      (newStyle === "fontWeight" ||
        newStyle === "fontStyle" ||
        newStyle === "textDecoration") &&
      Object.keys(this.state.style).includes(newStyle) &&
      this.state.style[newStyle] === style[newStyle]
    ) {
      console.log(style, this.state.style[newStyle]);
      let newState = { ...this.state.style };
      newState[newStyle] = "initial";
      editedStyle = { ...this.state, style: { ...newState } };
      compStyle = { ...newState };
    } else {
      //new style so append it
      editedStyle = {
        ...this.state,
        style: { ...this.state.style, ...style },
      };
      compStyle = {
        ...this.state.style,
        ...style,
      };
    }
    compStyle.left = undefined;
    compStyle.top = undefined;
    compStyle.position = "initial";
    let newComp = React.cloneElement(this.state.comp, {
      style: compStyle,
    });
    this.setState({
      ...editedStyle,
      comp: newComp,
    });
    return this.state.style;
  };

  onClick = () => {
    //open the editor menu according to the type of content
    //for testing, only the text one will show
    switch (this.state.type) {
      case "Text":
        this.props.menuSetter({
          property: this.props.displayProperties.text,
          changeFunc: this.changeStyle,
          style: this.state.style,
        });
        break;
      case "Button":
        this.props.menuSetter({
          property: this.props.displayProperties.button,
          changeFunc: this.changeStyle,
          style: this.state.style,
        });
        break;
      case "Image":
        this.props.menuSetter({
          property: this.props.displayProperties.img,
          changeFunc: this.changeStyle,
          style: this.state.style,
        });
        break;
    }
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
        onClick={this.onClick}
        className={this.state.className}
        style={this.state.style}
      >
        {this.state.comp}
      </div>
    );
  }
}

export default DragComp;
