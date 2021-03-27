import React from "react";
import { Heading, Box, Flex, VStack } from "@chakra-ui/react";
import Sidebar from "../components/SideBar/SideBar.js";
import { SearchBar } from "../components/SearchBar.js";
import { IndexedGallery } from "../components/ImageGallery.js";
import TwoGrid from "../components/FourGrid.js";
import CardViewWrapper from "../components/CardViewWrapper";
import { connect } from "react-redux";
import { getTemplateByUserSearch } from "../actions/cardActions";

import PropTypes from "prop-types";

class Dashboard extends React.Component {
	// run use effect once
	constructor(props) {
		super(props);
		this.handleAbout = this.handleAbout.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.handleBrowse = this.handleBrowse.bind(this);
		this.state = {
			isLoggedin: false,
			templates: this.props.auth.user.templates,
			searchResults: [],
		};
	}
	componentDidMount() {
		let searchResults = [];
		if (this.props.auth && this.props.auth.user) {
			this.setState({
				isLoggedin: true,
			});
			console.log(this.props.auth.user.username);
		} else {
			this.setState({
				searchResults,
				isLoggedin: false,
			});
		}
		this.setState({ templates: this.props.auth.user.templates });
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

	searchTemplates = async (search) => {
		await getTemplateByUserSearch(search).then((templates) => {
			this.setState({ templates });
		});
	};

	render() {
		let TwoGrids = [];
		// Make as many TwoGrids as possible with the templates
		const templates = this.state.templates;
		let i = 0;
		for (i = 0; i < templates.length - 1; i += 2) {
			TwoGrids.push(
				<TwoGrid>
					<CardViewWrapper
						username={templates[i].postUser}
						numlikes={templates[i].stars}
						title={templates[i].title}
					/>
					<CardViewWrapper
						username={templates[i + 1].postUser}
						numlikes={templates[i + 1].stars}
						title={templates[i + 1].title}
					/>
				</TwoGrid>
			);
		}
		// Add the last template
		if (i === templates.length - 1) {
			TwoGrids.push(
				<TwoGrid>
					<CardViewWrapper
						username={templates[i].postUser}
						numlikes={templates[i].stars}
						title={templates[i].title}
					/>
				</TwoGrid>
			);
		}
		return (
			<div>
				<Flex width="100%" height="100%" flex-direction="row">
					<Sidebar
						isLoggedin={this.state.isLoggedin}
						history={this.props.history}
					/>
					<Box width="80%" height="100%" p={8}>
						<VStack mb={5} h="100%" bg="palette.500">
							<Heading
								color={("palette.200", "palette.600")}
								mr="auto"
							>
								Your Cards
							</Heading>
							<VStack spacing="1em" w="100%">
								<SearchBar
									searchTemplates={this.searchTemplates}
								/>
							</VStack>
							<Box w="100%" h="70vh">
								<IndexedGallery>
									{TwoGrids ? TwoGrids : ""}
								</IndexedGallery>
							</Box>
						</VStack>
					</Box>
				</Flex>
			</div>
		);
	}
}

Dashboard.propTypes = {
	auth: PropTypes.object,
};
// This is the user state from the reducer.
const mapStateToProps = (state) => ({
	auth: state.auth,
	error: state.error,
});

export default connect(mapStateToProps)(Dashboard);
