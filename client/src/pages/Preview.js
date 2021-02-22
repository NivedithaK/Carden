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

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.cardName = "No Card Yet";
  }
  render() {
    return (
      <Box w="100%" h="100%" bg="blue.500">
        <Heading>PREVIEW TIME {this.cardName}</Heading>
        <Grid templateColumns="1fr 4fr">
          <GridItem>
            <Box>
              <FormControl id="Link">
                <FormLabel>Send this link:</FormLabel>
                <Input placeholder="https://egift.com/link" />
              </FormControl>
            </Box>
            {/* {cardDetails && <ViewTemplate props={cardDetails}/> }*/}
          </GridItem>
          <GridItem>
            {/* {cardDetails && <ViewTemplate props={cardDetails}/> }*/}
          </GridItem>
        </Grid>
      </Box>
    );
  }
}

export default Preview;
