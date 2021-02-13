import React, { useEffect, useState } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
// import { useHistory } from "react-router-dom";
// import EditTemplate from "../../components/EditTemplate";
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

function Edit() {
  //   let { path, url } = useRouteMatch();
  //   const history = useHistory();
  //   const { cardId, cardName } = props;
  //   const [cardDetails, setDetails] = useState();
  const cardName = "Card"; // remove this later
  // run use effect once
  useEffect(() => {
    // Pull card info from db here
    // use cardId and make get request
    // setDetails(...);
  }, []);
  return (
    <Box w="100%" h="100%" bg="blue.500">
      <Heading>Editing Template: {cardName}</Heading>
      {/* {cardDetails && <EditTemplate props={cardDetails}/> }*/}
    </Box>
  );
}

export default Edit;
