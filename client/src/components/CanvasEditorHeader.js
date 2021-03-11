import React from "react";

import {
  Heading,
  Button,
  useColorModeValue,
  Flex,
  Center,
  Grid,
  GridItem,
} from "@chakra-ui/react";

import { 
  ToolItem , 
  SelectionMenu, 
} from './EditorMenuItems.js';

function CanvasEditorHeader(props){

    return (
        <Flex {...props} bg={useColorModeValue("palette.700")}>
            <Heading flex="3" size="lg">Creating Template</Heading>
            <Center flex="1">
                <Button flex="1">Save</Button>
            </Center>
            <Center flex="4">
                <Heading size="sm">Current page: </Heading>
                <SelectionMenu/>
            </Center>
            
            <Center flex="1">
                <Button>Add Page</Button>
            </Center>
            <Center flex="6"></Center>
            <Center flex="1.5">
                <Button>Done</Button>
            </Center>
            <Center flex="1.5">
                <Button>Share</Button>
            </Center>
        </Flex>
    );
}

export default CanvasEditorHeader;

