import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
// import ViewTemplate from "../../components/ViewTemplate"; <- create this
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

function Preview() {
  //   const history = useHistory();
  //   const { cardId, cardName } = props;
  //   const [cardDetails, setDetails] = useState();
  // const [link, setLink] = useState();
  const cardName = "Card"; // remove this later
  // run use effect once
  useEffect(() => {
    console.log("hi from preview");
    // Pull card info from db here
    // use cardId and make get request
    // setDetails(...);
    // create link for card;
    // setLink();
  }, []);
  return (
    <Box w="100%" h="100%" bg="blue.500">
      <Heading>PREVIEW TIME{props.cardName}</Heading>
      <Grid templateColumns="1fr 4fr">
        <GridItem>
          <Box>
            {/* <FormControl id="Link" >
                <FormLabel>Send this link:</FormLabel>
                <Input placeholder="https://egift.com/link" value={link} />
                </FormControl> */}
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

export default Preview;
