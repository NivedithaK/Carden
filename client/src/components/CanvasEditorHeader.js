import React, { useEffect, useState, Component } from "react";
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
  ButtonGroup,
  useColorModeValue,
  Flex,
  Divider,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Center,
} from "@chakra-ui/react";

import { ChevronDownIcon } from '@chakra-ui/icons';

import { SketchPicker } from 'react-color';

// Todo: organize the below stuff later

import { 
  ToolSection, 
  ToolItem , 
  DragAndDropItem, 
  ThickHDivider, 
  PXStepper,
  SelectionMenu, 
  ColorSelector,
} from './EditorMenuItems.js';
//

const properties = {default: 1, text: 2, img: 3, button: 4}

function CanvasEditorHeader(){

    return (
        <Flex w="100%" zIndex={5} bg={useColorModeValue("palette.700")}>
            <Heading flex="3" size="lg">Creating Template</Heading>
            {/* {<CreateTemplate props={cardDetails}/> }*/}
            <Center flex="1">
                <Button flex="1">Save</Button>
            </Center>
            
            <ToolItem flex="4" label="Current page">
                <SelectionMenu/>
            </ToolItem>
        
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

