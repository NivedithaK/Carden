import { omitThemingProps } from "@chakra-ui/react";
import React from "react";

class DragComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: { display: "block", top: "0", left: "0" },
    };
  }
  
  dragStart = (e) => {
    const target = e.target;

    e.dataTransfer.setData("compId", target.id);

    setTimeout(() => {
      this.setState({ style: { display: "none" } });
    }, 0);
  };

  dragOver = (e) => {
    e.stopPropagation();
  };

  dragEnd = (e) => {
    // this.setState({
    //   style: {
    //     left:
    //       ((e.clientX + window.pageXOffset) * 100) / window.innerWidth + "vw",
    //     top:
    //       ((e.clientY + window.pageYOffset) * 100) / window.innerHeight + "vh",
    //   },
    // });
    setTimeout(() => {
      this.setState({ style: { display: "inline" } });
    }, 0);
  };

  getpos = () => {
    return this.state.style.top, this.state.style.left;
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
