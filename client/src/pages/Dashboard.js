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
import { connect } from "react-redux";

import PropTypes from "prop-types";

class Dashboard extends React.Component {
    // run use effect once
    constructor(props) {
        super(props);
        this.handleAbout = this.handleAbout.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleBrowse = this.handleBrowse.bind(this);
        this.state = { isLoggedin: false };
    }
    componentDidMount() {
        if (this.props.auth && this.props.auth.user) {
            this.setState({
                isLoggedin: true,
            });
        } else {
            this.setState({
                isLoggedin: false,
            });
        }
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
                <Sidebar isLoggedin={this.state.isLoggedin} />
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

Dashboard.propTypes = {
    auth: PropTypes.object,
};
// This is the user state from the reducer.
const mapStateToProps = (state) => ({
    auth: state.auth,
    error: state.error,
});

export default connect(mapStateToProps)(Dashboard);
