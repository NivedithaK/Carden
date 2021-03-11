import React from "react";
import LoginView from "../components/LoginView";

// Redux
import { loginUser } from "../actions/authActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
		};
		this.handleLogin = this.handleLogin.bind(this);
		this.setUsername = this.setUsername.bind(this);
		this.setPassword = this.setPassword.bind(this);
	}
	handleLogin = async (e) => {
		e.preventDefault();

		const user = {
			username: this.state.username,
			password: this.state.password,
		};
		console.log(user);
		await this.props.loginUser(user);
	};
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
	render() {
		return (
			<LoginView
				handlers={{
					setUsername: this.setUsername,
					setPassword: this.setPassword,
					handleLogin: this.handleLogin,
				}}
			/>
		);
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	currentUser: PropTypes.object,
	error: PropTypes.object,
};
// This is the current state in the store.
const mapStateToProps = (state) => ({
	auth: state.auth,
	error: state.error,
});

export default connect(mapStateToProps, { loginUser })(Login);
