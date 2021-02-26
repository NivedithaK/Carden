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
} from '../../components/EditorMenuItems';
//

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
  const [canvasColor, setCanvasColor] = useState({r: 191, g:251, b:255, a: 1});
  const properties = {default: 1, text: 2, img: 3, button: 4}
  const [propertyMenu, setPropertyMenu] = useState(properties.default);

  //Todo = elements list of things on the canvas

  // Color selector can change this thing's color <Box bg={`rgba(${canvasColor.r}, ${canvasColor.g}, ${canvasColor.b}, ${canvasColor.a})`}>Placeholder</Box>

  return (
    <Flex direction="column" h="100vh" width="100%" overflow="hidden"> 
      <Box w="100%" bg={useColorModeValue("palette.700")}>
        <Heading>Creating Template</Heading>
        {/* {<CreateTemplate props={cardDetails}/> }*/}
      </Box>
      <ThickHDivider color={useColorModeValue("palette.800")}/>
      <Box h="100%" w="100%" >
      <Flex 
        direction={{sm: "column", lg: "row"}} 
        align="stretch" h="100%" w="100%" 
        bg={useColorModeValue("palette.600")}
         > 
         {/**Left Sidebar */}
          <Flex h="100%" flex="2" zIndex={3} direction={{sm: "row", lg: "column"}} bg={useColorModeValue("palette.700")}>

            {/**Canvas Attributes */}
            <ToolSection  flex="1" title="Canvas Attributes">
              <Heading size="sm" padding={1}>Dimensions</Heading>
              <Divider/>
              <ToolItem  m="auto" label='Width'> 
                <PXStepper min={100} max={2000} defaultValue={500} step={10}/>
              </ToolItem>
              <ToolItem  m="auto" label='Height'> 
                <PXStepper min={100} max={2000} defaultValue={500} step={10}/>
              </ToolItem>

              <Heading size="sm" padding={1}>Background Color</Heading>
              <Divider/>
              <ToolItem   m="auto" label="Select">
                  <ColorSelector changeColor={setCanvasColor}/>
              </ToolItem>
            </ToolSection>


            {/**Drag and Drop*/}
            <ToolSection flex="1" title="Drag and Drop">
              {/**Below are placeholder buttons that do not have actual drag and drop functionality */}
              <Divider/>
              <Flex h="70%" direction={{sm: "column", md: "row", lg: "column"}}>
                {/**The placeholder buttons should only bring up the property list right now */}
                <DragAndDropItem m="1em" flex="1" label="Add Text" onClick={() => setPropertyMenu(properties.text)}></DragAndDropItem>
                <DragAndDropItem m="1em" flex="1" label="Add Image" onClick={() => setPropertyMenu(properties.img)}></DragAndDropItem>
                <DragAndDropItem m="1em" flex="1" label="Add Button" onClick={() => setPropertyMenu(properties.button)}></DragAndDropItem>
              </Flex>
            </ToolSection>
          </Flex>
          {/**
           * Center box
           */}
          <Box h="100%" flex="9" zIndex={1} bg={useColorModeValue("palette.600")} overflow="hidden">
            <Box 
                bg={`rgba(${canvasColor.r}, ${canvasColor.g}, ${canvasColor.b}, ${canvasColor.a})`}
                zIndex={2} //This should appear under any menu item but above the grey space
                //Centering
                pos="relative"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                // Todo: add the ablity to resize the canvas and reposition within the user's view. Potentially need another box
                w="1000px"
                h="600px"
                maxH="100%"
                maxW="100%"
                >
                  Placeholder Canvas
            </Box>
          </Box>
          {/**Right Sidebar */}
          <Flex h="100%" w="100%" flex="2" zIndex={3} bg={useColorModeValue("palette.700") }>
            {/**Properties of the currently selected item with conditional rendering */}
            <ToolSection title="Properties" w="100%">
              <Divider/>
              <ToolItem label="Component" m="auto" textAlign="center"> 
                {propertyMenu == properties.default ? "No Component Selected" : null}
                {propertyMenu == properties.text ? "Text" : null}
                {propertyMenu == properties.img ? "Image" : null}
                {propertyMenu == properties.button ? "Button" : null}
              </ToolItem>
              <Divider/>

              {propertyMenu == properties.text || propertyMenu == properties.button ?
                <Box>
                    <ToolItem label="Font">
                      <SelectionMenu/>
                    </ToolItem>
                    <ToolItem label="Font-Size">
                      <PXStepper min={8} max={144} defaultValue={12} step={2}/>
                    </ToolItem>
                    <ToolItem label="Color">
                      <ColorSelector changeColor={(placeholder) => {}}/>
                    </ToolItem>
                    <Center>
                      <Heading size="sm" padding={1}>Style</Heading>
                    </Center>
                    <Center w="100%">
                      <ButtonGroup size="sm" isAttached variant="outline">
                        <Button>Bold</Button>
                        <Button>Italics</Button>
                        <Button>Underline</Button>
                      </ButtonGroup>
                    </Center>
                </Box> : null
              }
              {propertyMenu == properties.text ?
                <Box>
                    <Center>
                      <Heading size="sm" padding={1}>Text Alignment</Heading>
                    </Center>
                    <Center w="100%">
                      <ButtonGroup size="sm" isAttached variant="outline">
                        <Button>Left</Button>
                        <Button>Center</Button>
                        <Button>Right</Button>
                      </ButtonGroup>
                    </Center>
                </Box> : null
              }

              {propertyMenu != properties.default ? 
                <Box>
                  <ToolItem label="x-position">
                  <PXStepper min={100} max={2000} defaultValue={500} step={10}/>
                  </ToolItem>
                  <ToolItem label="y-position">
                    <PXStepper min={100} max={2000} defaultValue={500} step={10}/>
                  </ToolItem>
                  <ToolItem label="box-width">
                    <PXStepper min={100} max={2000} defaultValue={500} step={10}/>
                  </ToolItem>
                  <ToolItem label="box-height">
                    <PXStepper min={100} max={2000} defaultValue={500} step={10}/>
                  </ToolItem>
                  <ToolItem label="box-color">
                    <ColorSelector changeColor={(placeholder) => {}}/>
                  </ToolItem>
                  <ToolItem label="Animation">
                    <SelectionMenu/>
                  </ToolItem>
                </Box> :null
              }
              
              {propertyMenu == properties.button ?
                <Box>
                  <ToolItem label="Links to">
                    <SelectionMenu/>
                  </ToolItem>
                  <ToolItem label="Transition">
                    <SelectionMenu/>
                  </ToolItem>
                </Box>
                :null
              }

              

            </ToolSection>

            
            
          </Flex>
      </Flex>
      </Box>
     
      
    </Flex>
  );
}

export default Create;
