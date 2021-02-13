import React from "react";
import { Stage } from "react-konva";

class Canvas extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Stage
        style={{ border: "black 2px", backgroundColor: "purple" }}
        width={window.innerWidth}
        height={window.innerHeight}
      >
        {this.props.children}
      </Stage>
    );
  }
}

export default Canvas;
