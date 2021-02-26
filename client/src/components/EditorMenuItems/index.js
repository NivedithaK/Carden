import React, { useEffect, useState } from 'react';
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

  const ToolSection = (props) => {
    return (
      <Box {...props}>
        <Heading size="md" m={2}>{props.title}</Heading>
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
        <Box d="inline-block" w="60%" p={1}>{props.children}</Box>
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
          <Box>
          {props.children}
          </Box>
          <Box w="100%" textAlign="center">
            <Heading size="sm">{props.label}</Heading>
          </Box>
        </Button>
      </Box>
      
    );
  };
  
  const ThickHDivider = ({color}) => {
    return (
      <Box h="2px" bg={color}></Box>
    );
  };
  
  function PXStepper({min, max, defaultValue, step}) {
    //Todo: add a hook that changes the canvas size
    const [value, setValue] = React.useState(defaultValue);
  
    return (
      <NumberInput
        onChange={(valueString) => setValue(valueString)}
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
    )
  
  }
  
  function SelectionMenu (props){
    /**Store Menu Items and Menu Selection in State */
    const [selection, setSelection] = useState("Select Option");
    return (
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon/> } overflow="hidden">
          {selection}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={()=> setSelection("Select Option")}>Select Option</MenuItem>
          <MenuItem onClick={()=> setSelection("Placeholder1")}>Placeholder1</MenuItem>
          <MenuItem onClick={()=> setSelection("Placeholder2")}>Placeholder2</MenuItem>
        </MenuList>
      </Menu>
    )
  }
  
  function ColorSelector({changeColor, props}){
    const [color, setColor] = React.useState({r: 191, g:251, b:255, a: 1});
    const [displayPicker, showDisplayPicker] = React.useState(false);
  
    const handleChange = (color) => {
      setColor(color.rgb);
      changeColor(color.rgb);
    };
  
    return (
      <Box {...props}>
          <Button 
            p={2}
            onClick={() => showDisplayPicker(!displayPicker)}
            border={"5px solid white"}
            bg={`rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`}
            boxShadow="base"
            w="100%"
          />
        {
          displayPicker ?
          <Box pos='absolute' zIndex={5}>
            <Box pos='fixed' top={0} right={0} bottom={0} left={0} onClick={()=> showDisplayPicker(false)}></Box>
            <SketchPicker color={color} onChange={(color) => handleChange(color)} />
          </Box> : null
        }
      </Box>
    )
  
  }

export {
    ToolSection, 
    ToolItem , 
    DragAndDropItem, 
    ThickHDivider, 
    SelectionMenu,
    PXStepper,
    ColorSelector,
};