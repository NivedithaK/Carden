import React from "react";
import LoginView from "../components/LoginView";

// Redux
import { loginUser, getUserTemplates } from "../actions/authActions";
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

<<<<<<< HEAD
		const user = {
			username: this.state.username,
			password: this.state.password,
		};
		console.log(user);
		await this.props.loginUser(user);
		await this.props.getUserTemplates();
		// console.log(this.props.auth.cards);
		// console.log(this.props.auth.templates);
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
			<div>
				<LoginView
					handlers={{
						setUsername: this.setUsername,
						setPassword: this.setPassword,
						handleLogin: this.handleLogin,
					}}
				/>
				{/* <button
					onClick={async () => {
						await this.props.getUserTemplates();
					}}
				>
					fucking work{" "}
				</button> */}
			</div>
		);
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	getUserTemplates: PropTypes.func.isRequired,
	currentUser: PropTypes.object,
	error: PropTypes.object,
	cards: PropTypes.object,
	templates: PropTypes.object,
=======
        const user = {
            username: this.state.username,
            password: this.state.password,
        };
        // console.log(user);
        const res = await this.props.loginUser(user);
        if (this.props.auth && this.props.auth.user) {
            this.props.history.push("/dashboard");
        }
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
                error={this.props.error}
            />
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    currentUser: PropTypes.object,
    error: PropTypes.object,
>>>>>>> develop
};
// This is the current state in the store.
const mapStateToProps = (state) => ({
    auth: state.auth,
    error: state.error,
});

export default connect(mapStateToProps, { loginUser, getUserTemplates })(Login);
