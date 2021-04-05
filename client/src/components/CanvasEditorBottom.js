import React, { useState, useEffect } from "react";

import {
  Box,
  useColorModeValue,
  Flex,
  Divider,
  Center,
  Button,
} from "@chakra-ui/react";

import {
  ToolSection,
  ToolItem,
  CanvasAttributesTools,
  CanvasDragAndDrop,
  ActualCanvasComponent,
  TextPropertiesMenu,
  TextAlignmentMenu,
  ComponentPositionMenu,
  ButtonSpecificMenu,
  ContentInput,
  SrcInput,
} from "./EditorMenuItems.js";

const properties = { default: 1, text: 2, img: 3, button: 4 };

function CanvasEditorBottom(props) {
  const [propertyMenu, setPropertyMenu] = useState({
    property: properties.default,
    changeFunc: null,
  });
  const { canvasColorSetter, canvasWidthHook, canvasHeightHook } = props;
  const { canvasColor, canvasWidth, canvasHeight } = props;
  useEffect(() => {
    props.changeSetter(setPropertyMenu, properties);
  }, []);

  return (
    <Flex
      flex={props.flex}
      direction={{ sm: "column", lg: "row" }}
      align="stretch"
      h="100%"
      w="100%"
      bg={useColorModeValue("palette.600")}
    >
      {/**Left Sidebar */}
      <Flex
        flex={{ sm: "2", lg: "3", xl: "5" }}
        zIndex={3}
        direction={{ sm: "row", lg: "column" }}
        bg={useColorModeValue("palette.700")}
        overflowY="scroll"
      >
        {/**Canvas Attributes */}
        <CanvasAttributesTools
          flex="1"
          colorSettingFunction={canvasColorSetter}
          widthHook={canvasWidthHook}
          heightHook={canvasHeightHook}
        />
        {/**Drag and Drop*/}
        <CanvasDragAndDrop
          flex="1"
          displayTextProperties={() =>
            setPropertyMenu({ property: properties.text })
          }
          displayImageProperties={() =>
            setPropertyMenu({ property: properties.img })
          }
          displayButtonProperties={() =>
            setPropertyMenu({ property: properties.button })
          }
          addComp={props.addComp}
        />
      </Flex>
      {/**Center box with dark grey bg*/}
      <Box
        flex={{ sm: "9", lg: "6", xl: "17" }}
        zIndex={1}
        bg={useColorModeValue("palette.600")}
        overflow="hidden"
      >
        <ActualCanvasComponent
          comps={props.comps}
          updatePos={props.updatePos}
          bg={canvasColor}
          h={`${canvasHeight}px`}
          w={`${canvasWidth}px`}
          changedDrop={props.changedDrop}
        />
      </Box>
      {/**Right Sidebar */}
      <Flex
        w="100%"
        flex={{ sm: "2", lg: "3", xl: "5" }}
        zIndex={3}
        bg={useColorModeValue("palette.700")}
        overflowY="scroll"
      >
        {/**Properties of the currently selected item with conditional rendering */}
        <ToolSection title="Properties" w="100%">
          {propertyMenu.property !== properties.default ? (
            <center>
              <Button
                onClick={() => {
                  props.deleteComp(propertyMenu.id);
                }}
              >
                Delete
              </Button>
            </center>
          ) : null}
          <Divider />
          {propertyMenu.property === properties.text ||
          propertyMenu.property === properties.button ? (
            <ContentInput
              id={propertyMenu.id}
              defaultValue={propertyMenu.content}
              setTargetField={propertyMenu.contentChanger}
            ></ContentInput>
          ) : null}
          {propertyMenu.property === properties.img ||
          propertyMenu.property === properties.button ? (
            <SrcInput
            id={propertyMenu.id}
              defaultValue={propertyMenu.content}
              setTargetField={propertyMenu.contentChanger}
            ></SrcInput>
          ) : null}
          <ToolItem label="Component" m="auto" textAlign="center">
            {propertyMenu.property === properties.default
              ? "No Component Selected"
              : null}
            {propertyMenu.property === properties.text ? "Text" : null}
            {propertyMenu.property === properties.img ? "Image" : null}
            {propertyMenu.property === properties.button ? "Button" : null}
          </ToolItem>
          <Divider />
          {propertyMenu.property === properties.text ||
          propertyMenu.property === properties.button ? (
            <TextPropertiesMenu items={propertyMenu} />
          ) : null}
          {propertyMenu.property === properties.text ? (
            <Center>
              <TextAlignmentMenu items={propertyMenu} />
            </Center>
          ) : null}
          {propertyMenu.property !== properties.default ? (
            <ComponentPositionMenu
              items={propertyMenu}
              canvasWidth={canvasWidth}
              canvasHeight={canvasHeight}
            />
          ) : null}
          {propertyMenu.property === properties.button ? (
            <ButtonSpecificMenu items={propertyMenu} />
          ) : null}
        </ToolSection>
      </Flex>
    </Flex>
  );
}

export default CanvasEditorBottom;
