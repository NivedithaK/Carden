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

import Upload from "./Upload/Upload.js";
import ModalPopup from "./ModalPopup.js"

const properties = {default: 1, text: 2, img: 3, button: 4}


function CanvasEditorBottom(props){

    const [propertyMenu, setPropertyMenu] = useState(properties.default);
    const {canvasColorSetter, canvasWidthHook, canvasHeightHook} = props;
    const {canvasColor, canvasWidth, canvasHeight} = props;
    return(
        <Flex 
            flex={props.flex}
            direction={{sm: "column", lg: "row"}} 
            align="stretch" h="100%" w="100%" 
            bg={useColorModeValue("palette.600")}
            > 
            {/**Left Sidebar */}
            <Flex flex={{sm: "2", lg: "3", xl: "5"}} zIndex={3} direction={{sm: "row", lg: "column"}} bg={useColorModeValue("palette.700")} overflowY="scroll">
                {/**Canvas Attributes */}
                <CanvasAttributesTools 
                    flex="1" 
                    colorSettingFunction={canvasColorSetter}
                    widthHook={canvasWidthHook}
                    heightHook={canvasHeightHook}
                    />
                {/**Image upload */}
                <Box flex="1" w="100%" p="1em">
                    <Box
                        width="100%"
                        height="100%"
                        boxShadow="md"
                        border="1px"
                        borderStyle="dashed"
                        borderRadius="md"
                        borderColor={useColorModeValue("palette.600")}
                        >
                        <ModalPopup buttonText="Upload Image">
                            <Upload uploadToCanvas={props.addComp}/>
                        </ModalPopup>
                    </Box>  
                </Box>
                {/**Drag and Drop*/}
                <CanvasDragAndDrop 
                    flex= "1"
                    displayTextProperties={() => setPropertyMenu(properties.text)}
                    displayImageProperties={() => setPropertyMenu(properties.img)}
                    displayButtonProperties={() => setPropertyMenu(properties.button)}
                    addComp={props.addComp}
                    />
            </Flex>
            {/**Center box with dark grey bg*/}
            <Box flex={{sm: "9", lg: "6", xl: "17"}} zIndex={1} bg={useColorModeValue("palette.600")} overflow="hidden"> 
                <ActualCanvasComponent 
                    comps={props.comps}
                    updatePos={props.updatePos}
                    bg={canvasColor}
                    h={`${canvasHeight}px`}
                    w={`${canvasWidth}px`}
                    />
            </Box>
            {/**Right Sidebar */}
            <Flex w="100%" flex={{sm: "2", lg: "3", xl: "5"}} zIndex={3} bg={useColorModeValue("palette.700") } overflowY="scroll">
                {/**Properties of the currently selected item with conditional rendering */}
                <ToolSection title="Properties" w="100%">
                    <Divider/>
                    <ToolItem label="Component" m="auto" textAlign="center"> 
                    {propertyMenu === properties.default ? "No Component Selected" : null}
                    {propertyMenu === properties.text ? "Text" : null}
                    {propertyMenu === properties.img ? "Image" : null}
                    {propertyMenu === properties.button ? "Button" : null}
                    </ToolItem>
                    <Divider/>
                    {propertyMenu === properties.text || propertyMenu === properties.button ? <TextPropertiesMenu/> : null}
                    {propertyMenu === properties.text ? <Center><TextAlignmentMenu/></Center>: null}
                    {propertyMenu !== properties.default ? <ComponentPositionMenu/> : null}
                    {propertyMenu === properties.button ? <ButtonSpecificMenu/> : null}
                </ToolSection>
            </Flex>
        </Flex>
    );
}

export default CanvasEditorBottom;