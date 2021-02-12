import React, { useState } from "react";
import View from "../../components/Signup View";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const checkUsernameUnique = async () => {
    //   make api call here (username.target.value)
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // can user either e.target....
    // or the const values above like email.target.value, idk why chakra uis doing something so
    // cant just do password != confirmPassword to check vals :(
    console.log(
      e.target.username.value,
      e.target.email.value,
      e.target.password.value,
      e.target.confirmPassword.value
    );
    if (password.target.value != confirmPassword.target.value) {
      alert("passwords dont match");
      console.log("passwords dont match");
      // change styles to make password field red?
      //   alert("Passwords must match!");
      // no register :(
      return;
    }
    // These are arbitrary checks, we can change as we like
    if (password.target.value.length < 5) {
      alert("Password must be at least 5 characters");
      return;
    }

    if (username.target.value.length < 5) {
      alert("Username must be at least 5 characters");
    }
    if (!checkUsernameUnique()) {
      alert(
        "username must be unique, this is already taken please try something else"
      );
    }
    console.log("hehe Sign up");
    // do some more validation here
    // - check username (make api call to check username is unqiue, ie. not already in db),
    //   username cannot be empty string so validate this.

    // await axios.post(); ..... Post req to sign in api end point,
    // send username, password, email
  };
  return (
    <View
      handlers={{
        setUsername,
        setPassword,
        setConfirmPassword,
        setEmail,
        handleSubmit,
      }}
    />
  );
}

export default Signup;
