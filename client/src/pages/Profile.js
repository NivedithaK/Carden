import React from "react";

// redux imports
import { connect } from "react-redux";
import { updateProfile } from "../actions/authActions";
import PropTypes from "prop-types";
import ProfileView from "../components/Profile/ProfileView";
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            isLoggedin: false,
            updated: false,
            errored: false,
            errorMsg: "",
        };
        this.setUsername = this.setUsername.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setConfirmPass = this.setConfirmPass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        console.log("Component mounted");
        // load user info in here for profile
        if (this.props.auth && this.props.auth.user) {
            this.setState({
                user: this.props.auth.user,
                username: this.props.auth.user.username,
                error: this.props.error,
                isLoggedin: true,
            });
        } else {
            this.props.history.push("/login");
        }
    }

    setUsername = (e) => {
        this.setState({
            ...this.state,
            username: e.target.value,
            updated: false,
            errored: false,
        });
    };
    setEmail = (e) => {
        this.setState({
            ...this.state,
            email: e.target.value,
            updated: false,
            errored: false,
        });
    };
    setPassword = (e) => {
        this.setState({
            ...this.state,
            password: e.target.value,
            updated: false,
            errored: false,
        });
    };
    setConfirmPass = (e) => {
        this.setState({
            ...this.state,
            confirmPassword: e.target.value,
            updated: false,
            errored: false,
        });
    };
    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({
            ...this.state,
            errored: false,
            errorMsg: "",
            updated: false,
        });
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                ...this.state,
                username: this.props.auth.user.username,
                errored: true,
                errorMsg: "Passwords must match",
            });
            return;
        }
        if (this.state.password != "" && this.state.password.length < 5) {
            this.setState({
                ...this.state,
                username: this.props.auth.user.username,
                errored: true,
                errorMsg: "Password must be at least 5 characters",
            });
            return;
        }

        if (this.state.username.length < 5) {
            this.setState({
                ...this.state,
                username: this.props.auth.user.username,
                errored: true,
                errorMsg: "Username must be at least 5 characters",
            });
            return;
        }

        const updatedUser = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        };

        await this.props.updateProfile(updatedUser, this.state.user["_id"]);
        if (this.props.error.id) {
            this.setState({
                ...this.state,
                user: this.props.auth.user,
                username: this.props.auth.user.username,
                errored: true,
                errorMsg: "Username must be unique",
            });
        } else {
            this.setState({
                ...this.state,
                user: this.props.auth.user,
                username: this.props.auth.user.username,
                updated: true,
                errorMsg: "",
            });
        }
    };
    render() {
        return (
            <>
                <ProfileView
                    data={{
                        username: this.state.username,
                        setUsername: this.setUsername,
                        setEmail: this.setEmail,
                        setPassword: this.setPassword,
                        setConfirmPass: this.setConfirmPass,
                        handleSubmit: this.handleSubmit,
                        isLoggedin: this.state.isLoggedin,
                        updated: this.state.updated,
                        errored: this.state.errored,
                        errorMsg: this.state.errorMsg,
                    }}
                />
            </>
        );
    }
}

Profile.propTypes = {
    updateProfile: PropTypes.func.isRequired,
    auth: PropTypes.object,
};
// This is the user state from the reducer.
const mapStateToProps = (state) => ({
    auth: state.auth,
    error: state.error,
});

export default connect(mapStateToProps, { updateProfile })(Profile);
