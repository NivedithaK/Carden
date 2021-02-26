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

import SketchExample from '../../components/ColorPicker';

// Todo: organize the below stuff later

const ToolSection = ({ title, children }) => {
  return (
    <Box flex="1">
      <Heading size="md" m={2}>{title}</Heading>
      <Divider orientation="horizontal" />
      {children}
    </Box>
  );
};

const ToolItem = ({ label, children }) => {
  return (
    <Box flex="1" m="auto">
      <Box d="inline-block" w="40%" textAlign="right" p={2}>
        <Heading size="sm">{label}</Heading>
      </Box>
      <Box d="inline-block" w="60%" p={1}>{children}</Box>
    </Box>
  );
};

const ThickHDivider = ({color}) => {
  return (
    <Box h="2px" bg={color}></Box>
  );
};

function PXStepper({min, max, defaultValue, step}) {

  const format = (val) => val + `px`;
  const parse = (val) => val.replace(/px$/, "");

  const [value, setValue] = React.useState(defaultValue);

  return (
    <NumberInput
      onChange={(valueString) => setValue(parse(valueString))}
      value={format(value)}
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

function ColorSelector({changeColor}){
  const [color, setColor] = React.useState({r: 191, g:251, b:255, a: 1});
  const [displayPicker, showDisplayPicker] = React.useState(false);

  const handleChange = (color) => {
    setColor(color.rgb);
    changeColor(color.rgb);
  };

  return (
    <Box>
        <Button 
          p={2}
          onClick={() => showDisplayPicker(!displayPicker)}
          border={"5px solid white"}
          bg={`rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`}
          boxShadow="base"
        />
      {
        displayPicker ?
        <Box pos='absolute' zIndex={2}>
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
  const [canvasColor, setColor] = useState({r: 191, g:251, b:255, a: 1});

  // Color selector can change this thing's color <Box bg={`rgba(${canvasColor.r}, ${canvasColor.g}, ${canvasColor.b}, ${canvasColor.a})`}>Placeholder</Box>

  return (
    <Flex direction="column"> 
      <Box w="100%" bg={useColorModeValue("palette.700")}>
        <Heading>Creating Template</Heading>
        {/* {<CreateTemplate props={cardDetails}/> }*/}
      </Box>
      <ThickHDivider color={useColorModeValue("palette.800")}/>
      <Flex direction={{sm: "column", lg: "row"}} align="stretch" h="80vh" w="100%" bg={useColorModeValue("palette.600")} > 
          <Flex h="100%" flex="1" bg={useColorModeValue("palette.700")}>
            <ToolSection title="Canvas Attributes">
              <Heading size="sm" padding={1}>Dimensions</Heading>
              <Divider/>
              <ToolItem label='Width'> 
                <PXStepper min={100} max={2000} defaultValue={500} step={10}/>
              </ToolItem>
              <ToolItem label='Height'> 
                <PXStepper min={100} max={2000} defaultValue={500} step={10}/>
              </ToolItem>
              <Heading size="sm" padding={1}>Background Color</Heading>
              <Divider/>
              <ToolItem label="Select">
                  {/**TODO: Figure out how to change the canvas with this SketchPicker */}
                  <ColorSelector changeColor={setColor}/>
              </ToolItem>

            </ToolSection>
          </Flex>
          <Box h="100%" flex="5" bg={useColorModeValue("palette.600")}>
            
          </Box>
          <Flex h="100%" flex="1" bg={useColorModeValue("palette.700")}>
            
          </Flex>
      </Flex>
      
      
    </Flex>
  );
}

export default Create;
