import React from "react";

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 };
  }

  drop(e) {
    e.preventDefault();
    const comp_id = e.dataTransfer.getData("comp_id");
    var comp = document.getElementById(comp_id);
    comp.style.position = "absolute";
    comp.style.left = (e.clientX/window.innerWidth)*100+"%";
    comp.style.top = (e.clientY/window.innerHeight)*100+"%";
    e.target.appendChild(comp);
  }

  dragOver = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <div
        id={this.props.id}
        className={this.props.className}
        onDrop={this.drop}
        onDragOver={this.dragOver}
        border="solid 2px white"
      >
        {this.props.children}
      </div>
    );
  }
}

export default Canvas;
