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
            console.log("REDUX: " + this.props.auth.user);
            this.setState({
                user: this.props.auth.user,
                username: this.props.auth.user.username,
            });
        } else {
            this.props.history.push("/login");
        }
    }
    setUsername = (e) => {
        this.setState({
            ...this.state,
            username: e.target.value,
        });
    };
    setEmail = (e) => {
        this.setState({
            ...this.state,
            email: e.target.value,
        });
    };
    setPassword = (e) => {
        this.setState({
            ...this.state,
            password: e.target.value,
        });
    };
    setConfirmPass = (e) => {
        this.setState({
            ...this.state,
            confirmPassword: e.target.value,
        });
    };
    handleSubmit = async (e) => {
        e.preventDefault();

        if (this.state.password !== this.state.confirmPassword) {
            alert("passwords dont match");
            console.log("passwords dont match");
            return;
        }
        if (this.state.password != "" && this.state.password.length < 5) {
            alert("Password must be at least 5 characters");
            return;
        }

        if (this.state.username.length < 5) {
            alert("Username must be at least 5 characters");
            return;
        }

        const updatedUser = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        };

        await this.props.updateProfile(updatedUser, this.state.user["_id"]);
    };
    render() {
        return (
            <ProfileView
                data={{
                    username: this.state.username,
                    setUsername: this.setUsername,
                    setEmail: this.setEmail,
                    setPassword: this.setPassword,
                    setConfirmPass: this.setConfirmPass,
                    handleSubmit: this.handleSubmit,
                }}
            />
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
