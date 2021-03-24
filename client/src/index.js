import React from "react";
import ReactDOM from "react-dom";
import { useHistory } from "react-router-dom";
import {
    BrowserRouter as Router,
    Switch as RRSwitch,
    Route,
} from "react-router-dom";
import Landing2 from "./pages/Landing2.js";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import Explore from "./pages/Explore.js";
import Dashboard from "./pages/Dashboard.js";
import Edit from "./pages/Edit.js";
import Preview from "./pages/Preview.js";
import Profile from "./pages/Profile.js";
import Create from "./pages/Create.js";
import About from "./pages/About.js";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import "./styles/index.css";

// export const PageWrapper = ({ children }) => {
// 	return (
// 		<div className="container">
// 			<main className="main">{children}</main>
// 			<Footer />
// 		</div>
// 	);
// };


function App() {
    const history = useHistory();
    return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				{/* {" "} */}
				{/* null passed to loading, persistor is being used here */}
				<Router>
					<ChakraProvider theme={theme}>
							<RRSwitch>
								<Route
									exact
									path="/"
									render={(props) => <Landing2 {...props} />}
								/>

								<Route
									exact
									path="/signup"
									component={Signup}
								/>
								<Route exact path="/login" component={Login} />
								<Route
									exact
									path="/explore"
									component={Explore}
								/>
								<Route
									exact
									path="/dashboard"
									component={Dashboard}
									history={history}
								/>
								<Route exact path="/edit" component={Edit} />
								<Route
									exact
									path="/preview"
									component={Preview}
								/>
								<Route
									exact
									path="/profile"
									component={Profile}
									history={history}
								/>
								<Route
									exact
									path="/create"
									component={Create}
								/>
								<Route exact path="/about" component={About} />
							</RRSwitch>
					</ChakraProvider>
				</Router>
			</PersistGate>
		</Provider>
	);
}

const rootElement = document.getElementById("root");
ReactDOM.render(
    <>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
    </>,
    rootElement
);
