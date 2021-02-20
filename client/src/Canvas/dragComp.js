import React from "react";



class DragComp extends React.Component {

  render() {
    return (
      <div
        id={this.props.id}
        draggable={this.props.draggable}
        onDragStart={this.dragStart}
        onDragEnd={this.dragEnd}
        onDragOver={this.dragOver}
      >
        {this.props.children}
      </div>
    );
  }

  dragStart = (e) => {
    const target = e.target;

    e.dataTransfer.setData("comp_id", target.id);

    setTimeout(() => {
      target.style.display = "none";
    }, 0);
  };

  dragOver = (e) => {
    e.stopPropagation();
  };
  
  dragEnd = (e) => {
    setTimeout(() => {
      e.target.style.display = "block";
    }, 0);
  }

}

export default DragComp;
