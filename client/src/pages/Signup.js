import React from "react";
import SignupView from "../components/SignupView.js";
// The following imports are for redux
// This connects the frontend to backend.
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import PropTypes from "prop-types";
import axios from "axios";

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
    }

    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };
    console.log(user);
    await axios
      .post("http://localhost:5000/api/users", user)
      .then((res) => {
        console.log(res.data);
        alert("Successfully Registered!");
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(err.response.data.msg);
      });

    // await axios.post(); ..... Post req to sign in api end point,
    // send username, password, email
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

// Signup.propTypes = {
// 	registerUser: PropTypes.func.isRequired,
// 	user: PropTypes.object,
// 	// authenticated: PropTypes.object,
// 	// msg: PropTypes.object,
// };
// // This is the user state from the reducer.
// const mapStateToProps = (state) => ({
// 	auth: state.auth,
// 	error: state.error,
// });

// export default connect(mapStateToProps, { registerUser })(Signup);
export default Signup;
