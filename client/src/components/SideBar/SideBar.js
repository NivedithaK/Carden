import React from "react";
import SideBarView from "./SideBarView";
// redux imports
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";
class SideBar extends React.Component {
    constructor(props) {
        super(props);
    }
    handleCreate = (e) => {
        e.preventDefault();
        this.props.history.push("/create");
    };
    handleCards = (e) => {
        e.preventDefault();
        this.props.history.push("/dashboard");
    };
    handleTemplates = (e) => {
        e.preventDefault();
        this.props.history.push("/explore");
    };
    handleSettings = (e) => {
        e.preventDefault();
        this.props.history.push("/profile");
    };
    handleLogout = (e) => {
        e.preventDefault();
        this.props.logoutUser();
        this.props.history.push("/");
    };
    handleHome = (e) => {
        e.preventDefault();
        this.props.history.push("/");
    };
    handleLogin = (e) => {
        e.preventDefault();
        this.props.history.push("/login");
    };
    handleSignup = (e) => {
        e.preventDefault();
        this.props.history.push("/signup");
    };
    render() {
        return (
            <SideBarView
                handlers={{
                    handleCreate: this.handleCreate,
                    handleCards: this.handleCards,
                    handleTemplates: this.handleTemplates,
                    handleSettings: this.handleSettings,
                    handleLogout: this.handleLogout,
                    handleHome: this.handleHome,
                    handleLogin: this.handleLogin,
                    handleSignup: this.handleSignup,
                    isLoggedin: this.props.isLoggedin,
                }}
            />
        );
    }
}

SideBar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object,
};
// This is the user state from the reducer.
const mapStateToProps = (state) => ({
    auth: state.auth,
    error: state.error,
});

export default connect(mapStateToProps, { logoutUser })(SideBar);
