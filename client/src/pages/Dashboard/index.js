import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Grid,
  GridItem,
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

function Dashboard() {
  const history = useHistory();
  // run use effect once
  useEffect(() => {
    // Check here the user is logged in
    // either we use tokens sent by server after log in function
    // or check a user context
    // if not logged in redirect to main page
    // history.push("/");, otherwise we are good to go
  }, []);
  const handleBrowse = (e) => {
    e.preventDefault();
  };
  const handleLogout = (e) => {
    e.preventDefault();
    // log user out
    // remove their user data
    history.push("/");
  };
  const handleAbout = (e) => {
    e.preventDefault();
    history.push("/");
  };
  return (
    <div>
      <Grid h="100%" templateColumns="1fr 5fr" gap={2}>
        <GridItem>
          <Box w="100%" h="100%" bg="blue.500">
            <Grid h="100%" templateColumns="1fr" gap={0}>
              <GridItem>
                <Button isActive="true" w="100%" onClick={handleBrowse}>
                  Browse Cards
                </Button>
                <Button w="100%">How to use</Button>
                <Button w="100%" onClick={handleAbout}>
                  About
                </Button>
                <Button w="100%">Help/Faq</Button>
                <Button w="100%" onClick={handleLogout}>
                  Log out
                </Button>
              </GridItem>
            </Grid>
          </Box>
        </GridItem>
        <GridItem>
          <Box w="100%" h="100%" bg="blue.500">
            <Heading>Browse Cards</Heading>
          </Box>
        </GridItem>
      </Grid>
    </div>
  );
}

export default Dashboard;
