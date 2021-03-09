import React, { Component } from "react";
import Canvas from "./canvas";
import DragComp from "./dragComp";
import { Button } from "@chakra-ui/react";
<<<<<<< HEAD
import { postTemplate, loadTemplate } from "../actions/cardActions";
=======
>>>>>>> origin/WEEB-89
import "./style.css";

class CreateCanvas extends Component {
  constructor() {
    super();
    this.state = {
      pos: [],
      comps: [],
      id: 0,
<<<<<<< HEAD
      ids: []
    };
  }

=======
    };
  }

  updatePos(id, left, top){
    let newPos = this.state.pos;
    newPos[id] = {x:left, y:top};
    //change the component that needs to rerender
    let components = this.state.comps;
    components[id] = React.cloneElement(components[id], {
      top:this.state.pos[id].y,
      left:this.state.pos[id].x,
      id:id
    });
    this.setState({...this.state, comps: components, pos: newPos});
  }

>>>>>>> origin/WEEB-89
  addComp = (e) => {
    let newcomp;
    let userin = window.prompt("Enter input (This is temporary, for demo purposes)", "");
    if(userin === "" || userin === null){
      return;
    }
    switch (e.target.value) {
      case "Button":
        newcomp = <Button>{userin}</Button>;
        break;
      case "Text":
        newcomp = <p>{userin}</p>;
        break;
      case "Image":
        newcomp = <img src={userin}></img>;
        break;
    }
<<<<<<< HEAD
    this.wrapComp(newcomp);
  };

  //TODO add entity types other than textfields
  loadComp = (content) => {
    return this.wrapComp(<p>{content}</p>);
  };

  wrapComp = (newcomp) => {
=======
    let extendedPos = this.state.pos;
    extendedPos.push({id:this.state.id, x:0, y:0});
    this.setState({pos: extendedPos});
>>>>>>> origin/WEEB-89
    let addedcomp = this.state.comps.concat(
      <DragComp
        key={this.state.id}
        id={this.state.id}
        className="comp"
        draggable="true"
<<<<<<< HEAD
=======
        top={this.state.pos[this.state.id].y}
        left={this.state.pos[this.state.id].x}
>>>>>>> origin/WEEB-89
      >
        {newcomp}
      </DragComp>
    );

<<<<<<< HEAD
    let id = this.state.id;
    this.state.ids.push(id);

    this.setState({
      comps: addedcomp,
      id: id + 1,
    });
    return id;
=======
    this.setState({
      comps: addedcomp,
      id: this.state.id + 1,
    });
>>>>>>> origin/WEEB-89
  };

  render() {
    return (
      <div className="App">
        <main className="flexbox">
          <Canvas id="pallet" className="pallet" dropable={false}>
            <Button value="Button" onClick={this.addComp}>
              Button
            </Button>
            <Button value="Text" onClick={this.addComp}>
              Text
            </Button>
            <Button value="Image" onClick={this.addComp}>
              Image
            </Button>
<<<<<<< HEAD
            <Button onClick={this.save}>
              Save
            </Button>
            <Button onClick={this.load}>
              Load
            </Button>
          </Canvas>
          <Canvas id="canvas" className="canvas" dropable={true}>
=======
          </Canvas>
          <Canvas id="canvas" className="canvas" dropable={true} changePos={this.updatePos.bind(this)}>
>>>>>>> origin/WEEB-89
            {this.state.comps}
          </Canvas>
        </main>
      </div>
    );
<<<<<<< HEAD
  };

  //TODO Change this to avoid using document.getElementById()
  save = () => {
    let tops = [];
    let lefts = [];
    this.state.ids.forEach(function(id) {
      tops.push(document.getElementById(id).style.top);
      lefts.push(document.getElementById(id).style.left);
    });
    postTemplate(this.render().props.children.props.children[1], tops, lefts);
  };

  //TODO Change this to avoid using document.getElementById()
  //TODO Add parsing for multiple scenes
  //TODO Add error catching if template id is invalid
  load = () => {
    let templateId = window.prompt("Enter template id (TODO hookup to template browser instead of prompt)", "");
    let template = loadTemplate(templateId);
    let self = this;
    Promise.resolve(template).then((newTemplate) => {
      Promise.all(newTemplate.scenes).then((newScenes) => {
        Promise.all(newScenes[0].entities).then((newEntities) => {
          newEntities.forEach(function(entity) {
            let compId = self.loadComp(entity.content);
            let comp = document.getElementById(compId);
            comp.style.position = "absolute";
            comp.style.left = entity.left;
            comp.style.top = entity.top;
          })
        });
      });
    });

    
    /**
    let comp = document.getElementById(templateId);
    comp.style.position = "absolute";
    comp.style.left = "10vw";
    comp.style.top = "10vw";
    */
  };
=======
  }
>>>>>>> origin/WEEB-89
}

export default CreateCanvas;
