import React, { useState } from "react";

import {
  Box,
  useColorModeValue,
  Flex,
  Divider,
  Center,
} from "@chakra-ui/react";

import { 
  ToolSection, 
  ToolItem , 
  CanvasAttributesTools,
  CanvasDragAndDrop,
  ActualCanvasComponent,
  TextPropertiesMenu,
  TextAlignmentMenu,
  ComponentPositionMenu,
  ButtonSpecificMenu,
} from './EditorMenuItems.js';

const properties = {default: 1, text: 2, img: 3, button: 4}


function CanvasEditorBottom(props){

    const [propertyMenu, setPropertyMenu] = useState(properties.default);

    return(
        <Flex 
            {...props}
            direction={{sm: "column", lg: "row"}} 
            align="stretch" h="100%" w="100%" 
            bg={useColorModeValue("palette.600")}
            > 
            {/**Left Sidebar */}
            <Flex h="100%" flex="2" zIndex={3} direction={{sm: "row", lg: "column"}} bg={useColorModeValue("palette.700")}>
                {/**Canvas Attributes */}
                <CanvasAttributesTools flex="1" colorSettingFunction={props.colorSettingFunction}/>
                {/**Drag and Drop*/}
                <CanvasDragAndDrop 
                    flex= "1"
                    displayTextProperties={() => setPropertyMenu(properties.text)}
                    displayImageProperties={() => setPropertyMenu(properties.img)}
                    displayButtonProperties={() => setPropertyMenu(properties.button)}
                    />
            </Flex>
            {/**Center box with dark grey bg*/}
            <Box h="100%" flex="9" zIndex={1} bg={useColorModeValue("palette.600")} overflow="hidden"> 
                <ActualCanvasComponent bg={props.canvasColor}/>
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
                    {propertyMenu == properties.text || propertyMenu == properties.button ? <TextPropertiesMenu/> : null}
                    {propertyMenu == properties.text ? <Center><TextAlignmentMenu/></Center>: null}
                    {propertyMenu != properties.default ? <ComponentPositionMenu/> : null}
                    {propertyMenu == properties.button ? <ButtonSpecificMenu/> : null}
                </ToolSection>
            </Flex>
        </Flex>
    );
}

export default CanvasEditorBottom;