import React from "react";
import SignupView from "../components/SignupView.js";

// redux imports
import { connect } from "react-redux";
import { registerUser, getUserTemplates } from "../actions/authActions";
import PropTypes from "prop-types";

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            confirmPassword: "",
            email: "",
        };
        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setConfirmPassword = this.setConfirmPassword.bind(this);
        this.setEmail = this.setEmail.bind(this);
    }
    setUsername(e) {
        e.preventDefault();
        this.setState({
            ...this.state,
            username: e.target.value,
        });
    }
    setPassword(e) {
        e.preventDefault();
        this.setState({
            ...this.state,
            password: e.target.value,
        });
    }
    setConfirmPassword(e) {
        e.preventDefault();
        this.setState({
            ...this.state,
            confirmPassword: e.target.value,
        });
    }
    setEmail(e) {
        e.preventDefault();
        this.setState({
            ...this.state,
            email: e.target.value,
        });
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        if (this.state.password !== this.state.confirmPassword) {
            alert("passwords dont match");
            console.log("passwords dont match");
            return;
        }
        if (this.state.password.length < 5) {
            alert("Password must be at least 5 characters");
            return;
        }

        if (this.state.username.length < 5) {
            alert("Username must be at least 5 characters");
            return;
        }

        const user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        };

<<<<<<< HEAD
		await this.props.registerUser(user);
		// TODO Check for ok response code
		await this.props.getUserTemplates();
	};
	render() {
		return (
			<SignupView
				handlers={{
					setUsername: this.setUsername,
					setPassword: this.setPassword,
					setConfirmPassword: this.setConfirmPassword,
					setEmail: this.setEmail,
					handleSubmit: this.handleSubmit,
				}}
			/>
		);
	}
}

Signup.propTypes = {
	registerUser: PropTypes.func.isRequired,
	getUserTemplates: PropTypes.func.isRequired,
	user: PropTypes.object,
=======
        await this.props.registerUser(user);
        // TODO Check for ok response code
        if (this.props.auth && this.props.auth.user) {
            this.props.history.push("/dashboard");
        }
    };
    render() {
        return (
            <SignupView
                handlers={{
                    setUsername: this.setUsername,
                    setPassword: this.setPassword,
                    setConfirmPassword: this.setConfirmPassword,
                    setEmail: this.setEmail,
                    handleSubmit: this.handleSubmit,
                }}
                error={this.props.error}
            />
        );
    }
}

Signup.propTypes = {
    registerUser: PropTypes.func.isRequired,
    user: PropTypes.object,
>>>>>>> develop
};
// This is the user state from the reducer.
const mapStateToProps = (state) => ({
    auth: state.auth,
    error: state.error,
});

export default connect(mapStateToProps, { registerUser, getUserTemplates })(
	Signup
);
