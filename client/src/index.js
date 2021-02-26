import React from "react";
import ReactDOM from "react-dom";
import {
	BrowserRouter as Router,
	Switch as RRSwitch,
	Route,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Explore from "./pages/Explore";
import Dashboard from "./pages/Dashboard";
import Edit from "./pages/Edit";
import Preview from "./pages/Preview";
import Profile from "./pages/Profile";
import Create from "./pages/Create";
import About from "./pages/About";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import "./styles/index.css";

function App() {
	return (
		<Router>
			<ChakraProvider theme={theme}>
				<Header />
				<RRSwitch>
					<Route exact path="/" component={Landing} />
					<Route exact path="/signup" component={Signup} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/explore" component={Explore} />
					<Route exact path="/dashboard" component={Dashboard} />
					<Route exact path="/edit" component={Edit} />
					<Route exact path="/preview" component={Preview} />
					<Route exact path="/profile" component={Profile} />
					<Route exact path="/create" component={Create} />
					<Route exact path="/about" component={About} />
				</RRSwitch>
				<Footer />
			</ChakraProvider>
		</Router>
	);
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
