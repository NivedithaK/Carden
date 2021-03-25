import React, { Component } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
// import { useHistory } from "react-router-dom";

import CanvasEditorView from "../components/CanvasEditorView.js";

class Create extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <CanvasEditorView history={this.props.history} />;
    }
}

export default Create;
