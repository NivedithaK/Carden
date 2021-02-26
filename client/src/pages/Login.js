import React from "react";
import LoginView from "../components/LoginView";

import axios from "axios";
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
    await axios
      .post("http://localhost:5000/api/users/login", user)
      .then((res) => {
        console.log(res.data);
        alert("Successfully Logged in!");
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
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

export default Login;
