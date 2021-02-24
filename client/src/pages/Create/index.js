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

import { SketchPicker } from 'react-color';

import SketchExample from '../../components/ColorPicker';

const ToolSection = ({ title, children }) => {
  return (
    <Box flex="1">
      <Heading size="md" m={2}>{title}</Heading>
      <Divider orientation="horizontal" />
      {children}
    </Box>
  );
};

const ToolItem = ({ label, children }) => {
  return (
    <Box flex="1" m="auto">
      <Box d="inline-block" w="40%" textAlign="right" p={2}>
        <Heading size="sm">{label}</Heading>
      </Box>
      <Box d="inline-block" w="60%" p={1}>{children}</Box>
    </Box>
  );
};

const ThickHDivider = ({color}) => {
  return (
    <Box h="2px" bg={color}></Box>
  );
};

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
  const [canvasColor, setColor] = useState({ color: "rgba(191, 251, 255, 1)" });
  return (
    <Flex direction="column"> 
      <Box w="100%" bg={useColorModeValue("palette.700")}>
        <Heading>Creating Template</Heading>
        {/* {<CreateTemplate props={cardDetails}/> }*/}
      </Box>
      <ThickHDivider color={useColorModeValue("palette.800")}/>
      <Flex direction={{sm: "column", lg: "row"}} align="stretch" h="80vh" w="100%" bg={useColorModeValue("palette.600")} > 
          <Flex h="100%" flex="1" bg={useColorModeValue("palette.700")}>
            <ToolSection title="Canvas Attributes">
              <Heading size="sm" padding={1}>Dimensions</Heading>
              <Divider/>
              <ToolItem label='Width'> help</ToolItem>
              <ToolItem label='Height'> help</ToolItem>
              <Heading size="sm" padding={1}>Background Color</Heading>
              <Divider/>
              <ToolItem label="Select">
                  <Box bg={canvasColor.color}>Placeholder</Box>
                  {/**TODO: Figure out React Hooks */}
              </ToolItem>
              

            </ToolSection>
          </Flex>
          <Box h="100%" flex="5" bg={useColorModeValue("palette.600")}>
            
          </Box>
          <Flex h="100%" flex="1" bg={useColorModeValue("palette.700")}>
            
          </Flex>
      </Flex>
      
      
    </Flex>
  );
}

export default Create;
