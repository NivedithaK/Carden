import React from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import HeaderView from "./HeaderView";
import { headerErrorClear } from "../../actions/headerActions";
class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    handleLogin = (e) => {
        e.preventDefault();
        this.props.headerErrorClear();
        this.props.history.push("/login");
    };
    handleAbout = (e) => {
        e.preventDefault();
        this.props.headerErrorClear();
        this.props.history.push("/about");
    };
    handleSignup = (e) => {
        e.preventDefault();
        this.props.headerErrorClear();
        this.props.history.push("/signup");
    };
    handleHome = (e) => {
        e.preventDefault();
        this.props.headerErrorClear();
        this.props.history.push("/");
    };
    render() {
        return (
            <HeaderView
                handlers={{
                    handleLogin: this.handleLogin,
                    handleAbout: this.handleAbout,
                    handleSignup: this.handleSignup,
                    handleHome: this.handleHome,
                }}
            />
        );
    }
}

Header.propTypes = {
    headerErrorClear: PropTypes.func.isRequired,
    auth: PropTypes.object,
};
// This is the user state from the reducer.
const mapStateToProps = (state) => ({
    auth: state.auth,
    error: state.error,
});

export default connect(mapStateToProps, { headerErrorClear })(Header);
