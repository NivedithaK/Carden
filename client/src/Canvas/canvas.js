import React from "react";
import { Box } from "@chakra-ui/react";
class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropable: props.dropable,
    };
  }

  drop = (e) => {
    e.preventDefault();
    let comp_id = e.dataTransfer.getData("compId");
    let rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top; //y position within the element.
    this.props.changePos(comp_id, x, y);
  };

  dragOver = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <Box
        style={this.props.style}
        id={this.props.id}
        className="canvas"
        onDrop={this.state.dropable ? this.drop : undefined}
        onDragOver={this.dragOver}
      >
        {this.props.children}
      </Box>
    );
  }
}

export default Canvas;
