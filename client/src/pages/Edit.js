import React from "react";

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

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.cardName = "No Cards Yet";
  }
  render() {
    return (
      <Box w="100%" h="100%" bg="blue.500">
        <Heading>Editing Template: {this.cardName}</Heading>
      </Box>
    );
  }
}

export default Edit;
