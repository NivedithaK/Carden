import React, { useState } from "react";
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

function Explore() {
  return (
    <div>
      <Grid h="100%" templateColumns="1fr 5fr" gap={2}>
        <GridItem>
          <Box w="100%" h="100%" bg="blue.500">
            <Heading>This is complicated page..sgsgegesg.</Heading>
          </Box>
        </GridItem>
        <GridItem>
          <Box w="100%" h="100%" bg="blue.500">
            big oofs
          </Box>
        </GridItem>
      </Grid>
    </div>
  );
}

export default Explore;
