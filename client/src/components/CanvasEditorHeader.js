import React from "react";

import {
  Heading,
  Button,
  useColorModeValue,
  Flex,
  Center,
  Grid,
  GridItem,
} from "@chakra-ui/react";

import { 
  ToolItem , 
  SelectionMenu, 
} from './EditorMenuItems.js';

function CanvasEditorHeader(props){

    return (
        <Grid 
            {...props} 
            bg={useColorModeValue("palette.700")}
            templateColumns={{sm: "repeat(12, 1fr)", md: "repeat(12, 1fr)", lg: "repeat(30, 1fr)", xl: "repeat(36, 1fr)"}}
            templateRows={{sm: "repeat(2, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(1, 1fr)", xl: "repeat(1, 1fr)"}}
            >
            <GridItem colSpan={{sm: 3, md: 3, lg: 6, xl: 6}} rowSpan={{sm: 2, md: 2, lg: 1, xl: 1}}>
                <Heading size="lg">Creating Template</Heading>
            </GridItem>
            <GridItem colSpan={{sm: 2, md: 2, lg: 2, xl: 2}}  rowSpan={{sm: 1, md: 1, lg: 1, xl: 1}}>
                <Center>
                    <Button>Save</Button>
                </Center>
            </GridItem>
            <GridItem colSpan={{sm: 7, md: 7, lg: 8, xl: 8}}  rowSpan={{sm: 1, md: 1, lg: 1, xl: 1}}>
                <Center>
                    <Heading size="sm">Current page: </Heading>
                    <SelectionMenu/>
                </Center>
            </GridItem>
            <GridItem colSpan={{sm: 2, md: 2, lg: 2, xl: 2}}  rowSpan={{sm: 1, md: 1, lg: 1, xl: 1}}>
                <Center>
                    <Button>Add Page</Button>
                </Center>
            </GridItem>
            <GridItem colSpan={{sm: 0, md: 0, lg: 6, xl: 12}}  rowSpan={{sm: 1, md: 1, lg: 1, xl: 1}}>
                <Center></Center>
            </GridItem>
            <GridItem colSpan={{sm: 2, md: 2, lg: 3, xl: 3}}  rowSpan={{sm: 1, md: 1, lg: 1, xl: 1}}>
                <Center>
                    <Button>Done</Button>
                </Center>
            </GridItem>
            <GridItem colSpan={{sm: 2, md: 2, lg: 3, xl: 3}}  rowSpan={{sm: 1, md: 1, lg: 1, xl: 1}}>
                <Center>
                    <Button>Share</Button>
                </Center>
            </GridItem>
        </Grid>
    );
}

export default CanvasEditorHeader;

