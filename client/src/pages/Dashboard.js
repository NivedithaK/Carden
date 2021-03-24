import React from "react";
import Sidebar from "../components/Sidebar.js";
import {
	Grid,
	GridItem,
	Box,
	VStack,
	omitThemingProps,
} from "@chakra-ui/react";
import CardSection from "../components/CardSection.js";
import Title from "../components/Title";

// Redux
import { getUserTemplates } from "../actions/authActions";
import { adjustLikeTemplate } from "../actions/cardActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.handleLogout = this.handleLogout.bind(this);
		this.handleBrowse = this.handleBrowse.bind(this);
		this.state = {
			cards: [],
			templates: [],
		};
	}

	async componentDidMount() {
		let cards = [];
		let templates = [];
		// Check if we are logged in
		if (!this.props.auth) return;
		await this.props.getUserTemplates();
		// Load cards from redux state
		cards = this.props.auth.cards;
		console.log(this.props.auth.cards);

		// Load templates from redux
		if (this.props.auth.templates) {
			templates = this.props.auth.templates;
		}
		console.log(this.props.auth.templates);

		// Set the state
		this.setState({
			cards,
			templates,
		});
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

	handleLike = async (templateId) => {
		await this.props.adjustLikeTemplate(templateId);
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
							<CardSection
								cards={this.props.auth.templates}
								handler={this.handleLike}
							/>
						</Box>
						<Title text="CARDS" />
						<Box
							w="100%"
							borderRadius="sm"
							borderWidth="2px"
							boxShadow="md"
						>
							<CardSection
								cards={this.props.auth.cards}
								handler={this.handleLike}
							/>
						</Box>
					</VStack>
				</GridItem>
			</Grid>
		);
	}
}

Dashboard.propTypes = {
	getUserTemplates: PropTypes.func.isRequired,
	adjustLikeTemplate: PropTypes.func.isRequired,
	error: PropTypes.object,
	cards: PropTypes.object,
	templates: PropTypes.object,
};
// This is the current state in the store.
const mapStateToProps = (state) => ({
	auth: state.auth,
	error: state.error,
});

export default connect(mapStateToProps, {
	getUserTemplates,
	adjustLikeTemplate,
})(Dashboard);
