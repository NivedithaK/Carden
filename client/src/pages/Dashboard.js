import React from "react";
import Sidebar from "../components/Sidebar.js";
import { Grid, GridItem, Box, VStack } from "@chakra-ui/react";
import CardSection from "../components/CardSection.js";
import Title from "../components/Title";

class Dashboard extends React.Component {

	constructor(props) {
		super(props);
		this.handleLogout = this.handleLogout.bind(this);
		this.handleBrowse = this.handleBrowse.bind(this);
	}

	handleBrowse = (e) => {
		// e.preventDefault();
	};

	handleLogout = (e) => {
		// log user out
		// remove their user data
		this.props.history.push("/");
	};

	handleCreate = (e) => {
		this.props.history.push("/create");
	};

	render() {
		return (
			<Grid
				h="100%"
				w="100%"
				templateColumns="repeat(5, 1fr)"
				mt={5}
				mb={5}
			>
				<GridItem colSpan={1}>
					<Sidebar />
				</GridItem>
				<GridItem colSpan={4} h="100%">
					<VStack w="98%">
						<Title text="TEMPLATES" />
						<Box
							w="100%"
							borderRadius="sm"
							borderWidth="2px"
							boxShadow="md"
						>
							<CardSection />
						</Box>
						<Title text="CARDS" />
						<Box
							w="100%"
							borderRadius="sm"
							borderWidth="2px"
							boxShadow="md"
						>
							<CardSection />
						</Box>
					</VStack>
				</GridItem>
			</Grid>
		);
	}
}

export default Dashboard;
