import React from "react";

class Canvas extends React.Component {

  constructor(props) {
    super(props);
  }

  drop = (e) =>{
    e.preventDefault();
    let comp_id = e.dataTransfer.getData("compId");
    let comp = document.getElementById(comp_id);
    comp.style.position = "absolute";
    comp.style.left = ((e.clientX+window.pageXOffset)*100)/window.innerWidth+"vw";
    comp.style.top = ((e.clientY+window.pageYOffset)*100)/window.innerHeight+"vh";
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
      >
        {this.props.children}
      </div>
    );
  }

}

export default Canvas;