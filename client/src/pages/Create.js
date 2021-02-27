import React from "react";
import CreateCanvas from "../Canvas/create";
import {
  Grid,
  GridItem,
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

export function Create() {
  return (
    <Box
      w="100%"
      h="100%"
      bg={useColorModeValue("palette.700", "palette.1000")}
    >
      <Heading>Creating Template</Heading>
      {/* {<CreateTemplate props={cardDetails}/> }*/}
      <CreateCanvas></CreateCanvas>
    </Box>
  );
}

export default Create;
