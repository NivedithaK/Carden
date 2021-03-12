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

  dragEnter = (e) => {
    e.stopPropagation();
    e.target.style.backgroundColor="red";
  };

  dragLeave = (e) => {
    e.stopPropagation();
    e.target.style.backgroundColor="transparent";
  };

  drop = (e) => {
    e.stopPropagation();
    e.target.style.backgroundColor="transparent";
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
    this.setState({ style: { ...this.state.style, ...style } });
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
        onDrop={this.drop}
        className={this.props.className}
        style={this.state.style}
      >
        {this.props.children}
      </div>
    );
  }
}

export default DragComp;
