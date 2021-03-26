import React, { useState } from "react";
import { 
    Box, 
    HStack, 
    Button, 
    VStack, 
    Center,
    NumberInput,
    NumberInputField,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const IndexButton = ({setIndex, value, variant}) => {
    return (
        <Button
            h="100%"
            w="100%"
            variant={variant}
            onClick={() => setIndex(value)}
            m="auto"
            >
                {value}
        </Button>
    );
}

function IndexedGallery(props){
    let [displayIndex, setDisplayIndex] = useState(0);
    const childrenNumber = React.Children.count(props.children);

    const keepInBounds = (num) => {
        if(num >= childrenNumber) return 0;
        if(num < 0) return childrenNumber - 1;
        return num;
    };

    let indexButtons = []
    for(let i = 0; i < childrenNumber; i++){  
            let variant="outline";
            if(i === displayIndex){
                variant="solid";
            }
            indexButtons.push(
                <Box flex="1">
                    <IndexButton value={i+1} variant={variant} setIndex={(index) =>  setDisplayIndex(keepInBounds(index - 1))}/>
                </Box>
               );
    }

	return (
        <VStack
            w="100%"
            h="100%"
            >
                <HStack
                    w="100%"
                    h="100%"
                    borderRadius="xl"
                    borderWidth="2px"
                    boxShadow="md"
                    >
                    <Button w="5%" h="100%" variant="ghost" onClick={()=> setDisplayIndex(keepInBounds(displayIndex - 1))}>
                        <ChevronLeftIcon/>
                    </Button>
                    <Center w="90%" h="100%"> 
                        {//Display the passed in child at this particular index
                            childrenNumber > 0 ? props.children[displayIndex] : "There is nothing here!"}
                    </Center>
                    <Button w="5%" h="100%" variant="ghost" onClick={()=> setDisplayIndex(keepInBounds(displayIndex + 1))}>
                        <ChevronRightIcon/>
                    </Button>
                </HStack>
                <HStack w="100%">
                        <Box mr="auto">
                            {displayIndex + 1} of {childrenNumber}
                        </Box>
                        <Box ml="auto">
                            <HStack>
                                <Box>Go to page: </Box>
                                <NumInput min={1} max={childrenNumber} defaultValue={displayIndex + 1} setTargetField={(index) =>  setDisplayIndex(keepInBounds(index - 1))}/>
                            </HStack>
                        </Box>
                </HStack>
        </VStack>
	);
}


function NumInput({ min, max, defaultValue, setTargetField }) {
    const [value, setValue] = React.useState(defaultValue);
    return (
      <NumberInput
        onChange={(valueString) => {
            if(!isNaN(Math.abs(valueString)) && Math.abs(valueString) === parseInt(valueString, 10) && Math.abs(valueString).toString() === valueString){
                let final = valueString;
                if(valueString > max){
                    final = max;
                }else if (valueString < min){
                    final = min;
                }
                setValue(final);
                setTargetField(final);
            }
            else{
                setValue(valueString);
            }
        }}
        value={value}
        min={min}
        max={max}
        step={1}
      >
        <NumberInputField />
      </NumberInput>
    );
  }


export {
    IndexedGallery,
};
