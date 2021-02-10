import React, { Component } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
	withRouter,
} from "react-router-dom";

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Router basename="/">
				<h1>Carden! wddas</h1>
			</Router>
		);
	}
}

export default App;
