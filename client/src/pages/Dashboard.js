import React from "react";
import {
	Grid,
	GridItem,
	Heading,
	Box,
	FormControl,
	FormLabel,
	Input,
	Button,
} from "@chakra-ui/react";
import Sidebar from "../components/Sidebar.js";

class Dashboard extends React.Component {
	// run use effect once
	constructor(props) {
		super(props);
		this.handleAbout = this.handleAbout.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.handleBrowse = this.handleBrowse.bind(this);
	}
	handleBrowse = (e) => {
		// e.preventDefault();
		console.log("back again");
	};
	handleLogout = (e) => {
		// log user out
		// remove their user data
		this.props.history.push("/");
	};
	handleCreate = (e) => {
		// log user out
		// remove their user data
		this.props.history.push("/create");
	};
	handleAbout = (e) => {
		this.props.history.push("/about");
	};
	render() {
		return (
			<div>
				<Sidebar isLoggedin={false} />
				<Grid h="100%" templateColumns="1fr 5fr" gap={2}>
					<GridItem>
						<Box w="100%" h="100%" bg="blue.500">
							<Grid h="100%" templateColumns="1fr" gap={0}>
								<GridItem>
									<Button
										isActive="true"
										w="100%"
										onClick={this.handleCreate}
									>
										Create template
									</Button>
									<Button
										w="100%"
										onClick={this.handleBrowse}
									>
										Browse Cards
									</Button>
									<Button w="100%">How to use</Button>
									<Button w="100%" onClick={this.handleAbout}>
										About
									</Button>
									<Button w="100%">Help/Faq</Button>
									<Button
										w="100%"
										onClick={this.handleLogout}
									>
										Log out
									</Button>
								</GridItem>
							</Grid>
						</Box>
					</GridItem>
					<GridItem>
						<Box w="100%" h="100%" bg="blue.500">
							<Heading>Browse Cards</Heading>
						</Box>
					</GridItem>
				</Grid>
			</div>
		);
	}
}

export default Dashboard;
