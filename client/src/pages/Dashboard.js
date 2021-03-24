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
import Sidebar from "../components/SideBar/SideBar.js";
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
                <Sidebar
                    isLoggedin={this.state.isLoggedin}
                    history={this.props.history}
                />
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
