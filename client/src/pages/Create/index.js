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
  useColorModeValue,
  Flex,
  Divider,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

import { SketchPicker } from 'react-color';

// Todo: organize the below stuff later

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
          <Flex h="100%" flex="1" zIndex={3} direction={{sm: "row", lg: "column"}} bg={useColorModeValue("palette.700")}>

            {/**Canvas Attributes */}
            <ToolSection  flex="1" title="Canvas Attributes" >
              <Heading size="sm" padding={1}>Dimensions</Heading>
              <Divider/>
              <ToolItem flex="1" m="auto" label='Width'> 
                <PXStepper min={100} max={2000} defaultValue={500} step={10}/>
              </ToolItem>
              <ToolItem flex="1" m="auto" label='Height'> 
                <PXStepper min={100} max={2000} defaultValue={500} step={10}/>
              </ToolItem>

              <Heading size="sm" padding={1}>Background Color</Heading>
              <Divider/>
              <ToolItem  flex="1" m="auto" label="Select">
                  <ColorSelector changeColor={setCanvasColor}/>
              </ToolItem>
            </ToolSection>


            {/**Drag and Drop*/}
            <ToolSection flex="1" title="Drag and Drop">
              {/**Below are placeholder buttons that do not have actual drag and drop functionality */}
              <Divider/>
              <Flex h="70%" direction={{sm: "column", md: "row", lg: "column"}}>
                <DragAndDropItem m="1em" flex="1" label="Add Text"></DragAndDropItem>
                <DragAndDropItem m="1em" flex="1" label="Add Image"></DragAndDropItem>
                <DragAndDropItem m="1em" flex="1" label="Add Button"></DragAndDropItem>
              </Flex>
            </ToolSection>
          </Flex>
          {/**
           * Center box
           */}
          <Box h="100%" flex="5" zIndex={1} bg={useColorModeValue("palette.600")} overflow="hidden">

          <Box 
              
              bg={`rgba(${canvasColor.r}, ${canvasColor.g}, ${canvasColor.b}, ${canvasColor.a})`}
              zIndex={2}
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
          <Flex h="100%" flex="1" zIndex={3} bg={useColorModeValue("palette.700") }>
            {/**Todo: dynamically relocate and resize the canvas or something */}
            
          </Flex>
      </Flex>
      </Box>
     
      
    </Flex>
  );
}

export default Create;
