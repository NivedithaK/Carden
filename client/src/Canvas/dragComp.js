import { omitThemingProps } from "@chakra-ui/react";
import React from "react";

class DragComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //top and left are place holders
<<<<<<< HEAD
      style: { position: "absolute", display: "inline", top: "25vw", left: "25vw" },
=======
      style: { display: "block", top: this.props.top, left: this.props.left },
>>>>>>> origin/WEEB-89
    };
  }

  dragStart = (e) => {
    const target = e.target;

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

  dragOver = (e) => {
    e.stopPropagation();
  };

  dragEnd = (e) => {
    setTimeout(() => {
      this.setState({
        style: {
          ...this.state.style,
          display: "block",
<<<<<<< HEAD
=======
          top: this.props.top,
          left: this.props.left
>>>>>>> origin/WEEB-89
        },
      });
    }, 0);
  };

  render() {
    return (
      <div
        id={this.props.id}
        draggable={this.props.draggable}
        onDragStart={this.dragStart}
        onDragEnd={this.dragEnd}
        onDragOver={this.dragOver}
        className={this.props.className}
        style={this.state.style}
      >
        {this.props.children}
      </div>
    );
  }
}

export default DragComp;
