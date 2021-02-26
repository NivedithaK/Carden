import React from "react";
import {
  GridItem,
  Grid,
  Box,
  FormControl,
  FormLabel,
  Button,
  Text,
  Input,
  Heading,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  };
  render() {
    return (
      <Center>
        <Heading>Profile</Heading>
        <form onSubmit={this.handleSubmit}>
          <Grid templateColumns="repeat(2, 1fr)" gap={2}>
            <Box w="100%" h="100%" bg="blue.500">
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input placeholder="Username" onChange={this.setUsername} />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="email@mail.com"
                  onChange={this.setEmail}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Password"
                  onChange={this.setPassword}
                />
              </FormControl>
              <FormControl id="confirmPass">
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  onChange={this.setConfirmPass}
                />
              </FormControl>
            </Box>
            <Box w="100%" h="100%" bg="blue.500">
              <Grid templateColumns="repeat(1, 1fr)" gap={2}>
                <img
                  src="https://cdn.dribbble.com/users/2565022/screenshots/13873863/media/26f7365efaa8734508f34e640d92ba8d.gif"
                  alt="Person studying"
                />
                <Button colorScheme="green" type="submit">
                  Save Settings
                </Button>
              </Grid>
            </Box>
          </Grid>
        </form>
      </Center>
    );
  }
}

export default Profile;
