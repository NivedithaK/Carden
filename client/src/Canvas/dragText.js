import React from "react";
import { Text } from "react-konva";

class DragText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDragging: false,
      x: 50,
      y: 50,
    };
  }

  render() {
    return (
      <Text
        text={this.props.text}
        x={this.state.x}
        y={this.state.y}
        draggable
        fontSize={this.state.isDragging ? "100" : "80"}
        onDragStart={(e) => {
          if (e.target.id == this.id) {
            this.setState({
              isDragging: true,
            });
          }
        }}
        onDragEnd={(e) => {
          if (e.target.id == this.id) {
            this.setState({
              isDragging: false,
              x: e.target.x(),
              y: e.target.y(),
            });
          }
        }}
      />
    );
  }
}

export default DragText;
