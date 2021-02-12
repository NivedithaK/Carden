import React, { useState } from "react";
import View from "../../components/Login View";

import axios from "axios";
function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const handleLogin = async (e) => {
		e.preventDefault();
		// console.log("hehe log in");
		// Two ways of getting same info
		console.log(username.target.value, password.target.value);
		console.log(e.target.username.value, e.target.password.value);
		const user = {
			username: username.target.value,
			password: password.target.value,
		};

		await axios
			.post("/api/users/login", user)
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				alert(err.response.data.msg);
			});
		// await axios.post(); ..... Post req to log in, make sure to send
		// user name and password.
	};
	return <View handlers={{ setUsername, setPassword, handleLogin }} />;
}

export default Login;
