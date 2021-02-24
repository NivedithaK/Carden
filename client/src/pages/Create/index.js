import React, { useEffect, useState } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
// import { useHistory } from "react-router-dom";
// import CreateTemplate from "../../components/CreateTemplate"; <- make this
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
  Flex,
  Divider,
} from "@chakra-ui/react";

function Create() {
  //   let { path, url } = useRouteMatch();
  //   const history = useHistory();
  //   const { cardId, cardName } = props;
  //   const [cardDetails, setDetails] = useState();
  // run use effect once
  useEffect(() => {
    // Validate user is logged in, and can make templates
    // if not then history.push("/explore");
  }, []);
  return (
    <Box h="100%" display="flex"> 
      <Box flex="1"w="100%" bg={useColorModeValue("palette.700")}>
        <Heading>Creating Template</Heading>
        {/* {<CreateTemplate props={cardDetails}/> }*/}
      </Box>
    
      <Flex flex="10" direction="row" align="stretch" h="100%" w="100%" > 
          <Box h="100%" flex="1" bg={useColorModeValue("palette.700")}>
            Content
          </Box>
          <Box h="100%" flex="5" bg={useColorModeValue("palette.600")}>
            Content
          </Box>
          <Box h="100%" flex="1" bg={useColorModeValue("palette.700")}>
            Content
          </Box>
      </Flex>
      
      
    </Box>
  );
}

export default Create;
