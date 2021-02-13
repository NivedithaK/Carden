import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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

function Profile() {
  const history = useHistory();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState("Mail");
  const [password, setPassword] = useState();
  const [confirmPass, setConfirmPass] = useState();
  useEffect(() => {
    //  Get user info populated
    setUsername("Me");
    // etc this should be existing info with the exception of passwords we dont get those
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit");
  };
  return (
    <Center>
      <Heading>Profile</Heading>
      <form onSubmit={handleSubmit}>
        <Grid templateColumns="repeat(2, 1fr)" gap={2}>
          <Box w="100%" h="100%" bg="blue.500">
            <FormControl id="username" isRequired>
              <FormLabel>Username</FormLabel>
              <Input placeholder="Username" onChange={setUsername} />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="email@mail.com"
                onChange={setEmail}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Password"
                onChange={setPassword}
              />
            </FormControl>
            <FormControl id="confirmPass" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                placeholder="Confirm Password"
                onChange={setConfirmPass}
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

export default Profile;
