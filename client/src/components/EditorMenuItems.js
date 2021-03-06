import React, { useEffect, useState, useRef } from "react";
import {
  Heading,
  Box,
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

import { ChevronDownIcon } from "@chakra-ui/icons";

import Canvas from "../Canvas/canvas";

import { SketchPicker } from 'react-color';

const ContentInput = (props) => {
  const [value, setValue] = React.useState(
    props.defaultValue(props.id).content
  );
  const prevValRef = useRef();
  useEffect(() => {
    if (props.defaultValue != prevValRef.current) {
      setValue(props.defaultValue(props.id).content);
    }
    prevValRef.current = props.defaultValue;
  });
  return (
    <ToolItem label="Content">
      <input
        onChange={(valueString) => {
          setValue(valueString.target.value);
          props.setTargetField(valueString.target.value, undefined);
        }}
        placeholder="Text"
        size="sm"
        variant="outline"
        value={value}
      />
    </ToolItem>
  );
};

const SrcInput = (props) => {
  const [value, setValue] = React.useState(props.defaultValue(props.id).src);
  const prevValRef = useRef();
  useEffect(() => {
    if (props.defaultValue != prevValRef.current) {
      setValue(props.defaultValue(props.id).src);
    }
    prevValRef.current = props.defaultValue;
  });
  return (
    <ToolItem label="Source">
      <input
        onChange={(valueString) => {
          setValue(valueString.target.value);
          props.setTargetField(undefined, valueString.target.value);
        }}
        placeholder="Text"
        size="sm"
        variant="outline"
        value={value}
      />
    </ToolItem>
  );
};

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
  const prevValRef = useRef();
  useEffect(() => {
    if (defaultValue != prevValRef.current) {
      setValue(defaultValue);
    }
    prevValRef.current = defaultValue;
  });

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

function SelectionSceneMenu(props) {
  /**Store Menu Items and Menu Selection in State */
  const { numScenes, currentScene } = props;
  const [selection, setSelection] = useState("Page 1");
  var menuItems = [];
  var i;
  for (i = 0; i < numScenes; i++) {
    const sceneNum = i;
    menuItems.push(
      <MenuItem
        onClick={() => {
          setSelection(`Page ${sceneNum + 1}`);
          props.setScene(sceneNum);
        }}
      >
        Page {sceneNum + 1}
      </MenuItem>
    );
  }
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />} overflow="hidden">
        {`Page ${currentScene + 1}`}
      </MenuButton>
      <MenuList>{menuItems}</MenuList>
    </Menu>
  );
}

function SelectionMenu(props) {
  /**Store Menu Items and Menu Selection in State */
  const [selection, setSelection] = useState(props.defaultValue);
  const prevValRef = useRef();
  useEffect(() => {
    if (props.defaultValue != prevValRef.current) {
      setSelection(props.defaultValue);
    }
    prevValRef.current = props.defaultValue;
  });
  let menu = props.items.map((item) => {
    return (
      <MenuItem
        onClick={() => {
          props.callback(item);
          setSelection(item);
        }}
      >
        {item}
      </MenuItem>
    );
  });
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />} overflow="hidden">
        {selection}
      </MenuButton>
      <MenuList>{menu}</MenuList>
    </Menu>
  );
}

function ColorSelector(props) {
  const [color, setColor] = React.useState({ r: 220, g: 118, b: 118, a: 1 });
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
               { <SketchPicker color={color} onChange={(color) => handleChange(color)} /> }
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
          **/
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
            props.addComp(e, 0, 0, "Text");
          }}
        ></DragAndDropItem>
        <DragAndDropItem
          m="1em"
          flex="1"
          label="Add Image"
          onClick={(e) => {
            props.addComp(e, 0, 0, "Image");
          }}
        ></DragAndDropItem>
        <DragAndDropItem
          m="1em"
          flex="1"
          label="Add Button"
          onClick={(e) => {
            props.addComp(e, 0, 0, "Button");
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
      changedDrop={props.changedDrop}
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
        <SelectionMenu
          defaultValue={props.items.style.fontFamily? props.items.style.fontFamily : "Serif"}
          items={[
            "Arial",
            "Arial Black",
            "Verdana",
            "Tahoma",
            "Trebuchet MS",
            "Impact",
            "Times New Roman",
            "Didot",
            "Georgia",
            "American Typewriter",
            "Andal?? Mono",
            "Courier",
            "Lucida Console",
            "Monaco",
            "Bradley Hand",
            "Brush Script MT",
            "Luminari",
            "Comic Sans MS",
          ]}
          callback={props.items.changeFunc}
        />
      </ToolItem>
      <ToolItem label="Font-Size">
        <PXStepper
          min={8}
          max={144}
          defaultValue={
            props.items.style.fontSize ? props.items.style.fontSize : 12
          }
          step={2}
          setTargetField={
            props.items.changeFunc
              ? (value) => {
                  props.items.style = props.items.changeFunc({
                    fontSize: value,
                  });
                }
              : (value) => {}
          }
        />
      </ToolItem>
      <ToolItem label="Color">
        <ColorSelector
          setClassStateColor={
            props.items.changeFunc
              ? (value) => {
                  let color = `rgba(${value.r}, ${value.g}, ${value.b}, ${value.a}`;
                  props.items.style = props.items.changeFunc({ color: color });
                }
              : (value) => {}
          }
        />
      </ToolItem>
      <Box p="1em" margin="0.25em">
        <Center>
          <Heading size="sm" padding={1}>
            Style
          </Heading>
        </Center>
        <Center w="100%">
          <ButtonGroup size="sm" isAttached variant="outline">
            <Button
              onClick={
                props.items.changeFunc
                  ? () => {
                      props.items.style = props.items.changeFunc({
                        fontWeight: "bold",
                      });
                    }
                  : () => {}
              }
            >
              Bold
            </Button>
            <Button
              onClick={
                props.items.changeFunc
                  ? () => {
                      props.items.style = props.items.changeFunc({
                        fontStyle: "italic",
                      });
                    }
                  : () => {}
              }
            >
              Italics
            </Button>
            <Button
              onClick={
                props.items.changeFunc
                  ? () => {
                      props.items.style = props.items.changeFunc({
                        textDecoration: "underline",
                      });
                    }
                  : () => {}
              }
            >
              Underline
            </Button>
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
          <Button
            onClick={
              props.items.changeFunc
                ? () => {
                    props.items.style = props.items.changeFunc({
                      className: "comp leftWorkaround",
                    });
                  }
                : () => {}
            }
          >
            Left
          </Button>
          <Button
            onClick={
              props.items.changeFunc
                ? () => {
                    props.items.style = props.items.changeFunc({
                      className: "comp centerWorkaround",
                    });
                  }
                : () => {}
            }
          >
            Center
          </Button>
          <Button
            onClick={
              props.items.changeFunc
                ? () => {
                    props.items.style = props.items.changeFunc({
                      className: "comp rightWorkaround",
                    });
                  }
                : () => {}
            }
          >
            Right
          </Button>
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
          min={0}
          max={props.canvasWidth}
          defaultValue={props.items.style.left ? props.items.style.left : 0}
          step={10}
          setTargetField={(value) => {
            if (value > props.canvasWidth) {
              value = props.canvasWidth;
            }
            props.items.style = props.items.changeFunc({ left: value });
          }}
        />
      </ToolItem>
      <ToolItem label="y-position">
        <PXStepper
          min={0}
          max={props.canvasHeight}
          defaultValue={props.items.style.top ? props.items.style.top : 0}
          step={10}
          setTargetField={(value) => {
            if (value > props.canvasHeight) {
              value = props.canvasHeight;
            }
            props.items.style = props.items.changeFunc({ top: value });
          }}
        />
      </ToolItem>
      <ToolItem label="box-width">
        <PXStepper
          min={1}
          max={props.canvasWidth}
          defaultValue={props.items.style.width ? props.items.style.width : 50}
          step={10}
          setTargetField={(value) => {
            props.items.style = props.items.changeFunc({ width: value });
          }}
        />
      </ToolItem>
      <ToolItem label="box-height">
        <PXStepper
          min={1}
          max={props.canvasHeight}
          defaultValue={
            props.items.style.height ? props.items.style.height : 50
          }
          step={10}
          setTargetField={(value) => {
            props.items.style = props.items.changeFunc({ height: value });
          }}
        />
      </ToolItem>
      <ToolItem label="box-color">
        <ColorSelector
          setClassStateColor={(value) => {
            let color = `rgba(${value.r}, ${value.g}, ${value.b}, ${value.a}`;
            props.items.style = props.items.changeFunc({
              backgroundColor: color,
            });
          }}
        />
      </ToolItem>
    </Box>
  );
}

function ButtonSpecificMenu(props) {
  return (
    <Box>
      <ToolItem label="Link to page">
        <SelectionMenu
          defaultValue={
            props.items.currentScene != null
              ? props.items.currentScene
              : "Select Page"
          }
          items={["Select Page"].concat(props.items.options())}
          callback={props.items.callback}
        />
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
  SelectionSceneMenu,
  PXStepper,
  ColorSelector,
  CanvasAttributesTools,
  CanvasDragAndDrop,
  ActualCanvasComponent,
  TextPropertiesMenu,
  TextAlignmentMenu,
  ComponentPositionMenu,
  ButtonSpecificMenu,
  ContentInput,
  SrcInput,
};
