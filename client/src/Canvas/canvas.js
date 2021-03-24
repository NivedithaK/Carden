import React from "react";
import { Box } from "@chakra-ui/react";
class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropable: props.dropable,
    };
  }

  dragOver = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <Box
        style={this.props.style}
        id={this.props.id}
        className="canvas"
        onDrop={this.state.dropable ? this.props.changedDrop : undefined}
        onDragOver={this.dragOver}
      >
        {this.props.children}
      </Box>
    );
  }
}

export default Canvas;
