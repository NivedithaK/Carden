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
import CanvasEditorHeader from "./CanvasEditorHeader.js";
import CanvasEditorBottom from "./CanvasEditorBottom.js";

const properties = {default: 1, text: 2, img: 3, button: 4}

class CanvasEditorView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            canvasColor: {r: 191, g:251, b:255, a: 1}, //Will have to have different background colors depending on the Canvas
            //propertyMenu: properties.default
        }
    }

    render(){
    return (
        <Flex direction="column" h="100vh" width="100%" overflow="hidden"> 
            <CanvasEditorHeader/>
            <ThickHDivider colorString={"palette.800"}/>
            <Box h="100%" w="100%" >
                <CanvasEditorBottom 
                    colorSettingFunction={(color) => this.setState({canvasColor: color})} 
                    canvasColor = {`rgba(${this.state.canvasColor.r}, ${this.state.canvasColor.g}, ${this.state.canvasColor.b}, ${this.state.canvasColor.a})`}
                    />
            </Box>
        </Flex>
    );
 }
}

export default CanvasEditorView;