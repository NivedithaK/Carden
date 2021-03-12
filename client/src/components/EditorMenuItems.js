import React, { useEffect, useState } from "react";
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
  Stack,
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

import { ChevronDownIcon } from "@chakra-ui/icons";

import Canvas from "../Canvas/canvas";

import { SketchPicker } from 'react-color';

const ToolSection = (props) => {
  return (
    <Box {...props}>
      <Heading size="md" m={2}>
        {props.title}
      </Heading>
      <Divider orientation="horizontal" />
      {props.children}
    </Box>
  );
};

const ToolItem = (props) => {
  return (
    <Box {...props}>
      <Box d="inline-block" w="40%" textAlign="right" p={2}>
        <Heading size="sm">{props.label}</Heading>
      </Box>
      <Box d="inline-block" w="60%" p={1}>
        {props.children}
      </Box>
    </Box>
  );
};

const DragAndDropItem = (props) => {
  return (
    <Box {...props}>
      <Button
        width="100%"
        height="100%"
        boxShadow="lg"
        border="1px"
        borderStyle="dashed"
        borderColor={useColorModeValue("palette.600")}
        p="1em"
      >
        <Box>{props.children}</Box>
        <Box w="100%" textAlign="center">
          <Heading size="sm">{props.label}</Heading>
        </Box>
      </Button>
    </Box>
  );
};

const ThickHDivider = (props) => {
  return (
    <Box
      flex={props.flex}
      h="2px"
      bg={useColorModeValue(props.colorstring)}
    ></Box>
  );
};

function PXStepper({ min, max, defaultValue, step, setTargetField }) {
  //Todo: add a hook that changes the canvas size
  const [value, setValue] = React.useState(defaultValue);

  return (
    <NumberInput
      onChange={(valueString) => {
        setValue(valueString);
        setTargetField(valueString);
      }}
      value={value}
      min={min}
      max={max}
      step={step}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
}

function SelectionMenu(props) {
  /**Store Menu Items and Menu Selection in State */
  const [selection, setSelection] = useState("Select Option");
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />} overflow="hidden">
        {selection}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => setSelection("Select Option")}>
          Select Option
        </MenuItem>
        <MenuItem onClick={() => setSelection("Placeholder1")}>
          Placeholder1
        </MenuItem>
        <MenuItem onClick={() => setSelection("Placeholder2")}>
          Placeholder2
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

function ColorSelector(props) {
  const [color, setColor] = React.useState({ r: 191, g: 251, b: 255, a: 1 });
  const [displayPicker, showDisplayPicker] = React.useState(false);

  const handleChange = (color) => {
    setColor(color.rgb);
    props.setClassStateColor(color.rgb);
  };

  return (
    <Box>
      <Button
        p={2}
        onClick={() => showDisplayPicker(!displayPicker)}
        border={"5px solid white"}
        bg={`rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`}
        boxShadow="base"
        w="100%"
      />
      {
        displayPicker ? (
          <Box>
            <Box
              pos="fixed"
              top={0}
              right={0}
              bottom={0}
              left={0}
              onClick={() => showDisplayPicker(false)}
            ></Box>
            <Box
              pos="absolute"
              zIndex={5}
              top={{ sm: "50%", lg: "auto" }}
              left={{ sm: "50%", lg: "auto" }}
              transform={{ sm: "translate(-50%, -50%)", lg: "auto" }}
            >
              <SketchPicker color={color} onChange={(color) => handleChange(color)} />
            </Box>
          </Box>
        ) : null
        /**relative boxes get hidden by overflow but we don't want that
          <Box pos='relative'>
            <Box pos='absolute' zIndex={5}>
              <Box pos='fixed' top={0} right={0} bottom={0} left={0} onClick={()=> showDisplayPicker(false)}></Box>
              <SketchPicker color={color} onChange={(color) => handleChange(color)} />
            </Box>
          </Box>
           */
      }
    </Box>
  );
}

//Larger components

function CanvasAttributesTools(props) {
  const { widthHook, heightHook } = props;

  return (
    <ToolSection flex={props.flex} title="Canvas Attributes">
      <Heading size="sm" padding={1}>
        Dimensions
      </Heading>
      <Divider />
      <ToolItem m="auto" label="Width">
        <PXStepper
          min={100}
          max={2000}
          defaultValue={500}
          step={10}
          setTargetField={(value) => widthHook(value)}
        />
      </ToolItem>
      <ToolItem m="auto" label="Height">
        <PXStepper
          min={100}
          max={2000}
          defaultValue={500}
          step={10}
          setTargetField={(value) => heightHook(value)}
        />
      </ToolItem>

      <Heading size="sm" padding={1}>
        Background Color
      </Heading>
      <Divider />
      <ToolItem m="auto" label="Select">
        <ColorSelector setClassStateColor={props.colorSettingFunction} />
      </ToolItem>
    </ToolSection>
  );
}

function CanvasDragAndDrop(props) {
  return (
    <ToolSection flex={props.flex} title="Drag and Drop">
      {/**Below are placeholder buttons that do not have actual drag and drop functionality */}
      <Divider />
      <Flex h="70%" direction={{ sm: "column", md: "row", lg: "column" }}>
        {/**The placeholder buttons should only bring up the property list right now */}
        <DragAndDropItem
          m="1em"
          flex="1"
          label="Add Text"
          onClick={(e) => {
            props.displayTextProperties();
            props.addComp(e, "Text");
          }}
        ></DragAndDropItem>
        <DragAndDropItem
          m="1em"
          flex="1"
          label="Add Image"
          onClick={(e) => {
            props.displayImageProperties();
            props.addComp(e, "Image");
          }}
        ></DragAndDropItem>
        <DragAndDropItem
          m="1em"
          flex="1"
          label="Add Button"
          onClick={(e) => {
            props.displayButtonProperties();
            props.addComp(e, "Button");
          }}
        ></DragAndDropItem>
      </Flex>
    </ToolSection>
  );
}

function ActualCanvasComponent(props) {
  //We do actual canvas things here I guess
  let style = {
    width: props.w,
    height: props.h,
    backgroundColor: props.bg,
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 2,
  };
  return (
    <Canvas
      style={style}
      id="canvas"
      className="canvas"
      dropable={true}
      changePos={props.updatePos}
    >
      {props.comps}
    </Canvas>
  );
}

function TextPropertiesMenu(props) {
  //Does note include Text Alignment
  return (
    <Box>
      <ToolItem label="Font">
        <SelectionMenu />
      </ToolItem>
      <ToolItem label="Font-Size">
        <PXStepper
          min={8}
          max={144}
          defaultValue={12}
          step={2}
          setTargetField={(placeholder) => {}}
        />
      </ToolItem>
      <ToolItem label="Color">
        <ColorSelector setClassStateColor={(placeholder) => {}} />
      </ToolItem>
      <Box p="1em" margin="0.25em">
        <Center>
          <Heading size="sm" padding={1}>
            Style
          </Heading>
        </Center>
        <Center w="100%">
          <ButtonGroup size="sm" isAttached variant="outline">
            <Button>Bold</Button>
            <Button>Italics</Button>
            <Button>Underline</Button>
          </ButtonGroup>
        </Center>
      </Box>
    </Box>
  );
}

function TextAlignmentMenu(props) {
  return (
    <Box p="1em" margin="0.25em">
      <Center>
        <Heading size="sm" padding={1}>
          Text Alignment
        </Heading>
      </Center>
      <Center w="100%">
        <ButtonGroup size="sm" isAttached variant="outline">
          <Button>Left</Button>
          <Button>Center</Button>
          <Button>Right</Button>
        </ButtonGroup>
      </Center>
    </Box>
  );
}

function ComponentPositionMenu(props) {
  return (
    <Box>
      <ToolItem label="x-position">
        <PXStepper
          min={100}
          max={2000}
          defaultValue={500}
          step={10}
          setTargetField={(placeholder) => {}}
        />
      </ToolItem>
      <ToolItem label="y-position">
        <PXStepper
          min={100}
          max={2000}
          defaultValue={500}
          step={10}
          setTargetField={(placeholder) => {}}
        />
      </ToolItem>
      <ToolItem label="box-width">
        <PXStepper
          min={100}
          max={2000}
          defaultValue={500}
          step={10}
          setTargetField={(placeholder) => {}}
        />
      </ToolItem>
      <ToolItem label="box-height">
        <PXStepper
          min={100}
          max={2000}
          defaultValue={500}
          step={10}
          setTargetField={(placeholder) => {}}
        />
      </ToolItem>
      <ToolItem label="box-color">
        <ColorSelector setClassStateColor={(placeholder) => {}} />
      </ToolItem>
      <ToolItem label="Animation">
        <SelectionMenu />
      </ToolItem>
    </Box>
  );
}

function ButtonSpecificMenu(props) {
  return (
    <Box>
      <ToolItem label="Links to">
        <SelectionMenu />
      </ToolItem>
      <ToolItem label="Transition">
        <SelectionMenu />
      </ToolItem>
    </Box>
  );
}

export {
  ToolSection,
  ToolItem,
  DragAndDropItem,
  ThickHDivider,
  SelectionMenu,
  PXStepper,
  ColorSelector,
  CanvasAttributesTools,
  CanvasDragAndDrop,
  ActualCanvasComponent,
  TextPropertiesMenu,
  TextAlignmentMenu,
  ComponentPositionMenu,
  ButtonSpecificMenu,
};
