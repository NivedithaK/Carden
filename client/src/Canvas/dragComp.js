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
    }, 0);
  };

  changeStyle = (style) => {
    //store the property being changed
    let newStyle = Object.keys(style)[0];
    //if its a number in string from, convert it
    if (typeof style[newStyle] && !isNaN(style[newStyle])) {
      style[newStyle] = parseFloat(style[newStyle]);
    }
    //check if its already in the style in which case toggle it everything other than font-size
    if (
      newStyle !== "fontSize" &&
      Object.keys(this.state.style).includes(newStyle) &&
      this.state.style[newStyle] === style[newStyle]
    ) {
      let newState = { ...this.state.style };
      newState[newStyle] = "initial";
      this.setState({ ...this.state, style: { ...newState } });
    } else {
      //new style so append it
      this.setState({
        ...this.state,
        style: { ...this.state.style, ...style },
      });
    }
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
        className={this.props.className}
        style={this.state.style}
      >
        {this.props.children}
      </div>
    );
  }
}

export default DragComp;
