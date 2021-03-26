import React from "react";
import { SimpleGrid, Center, Box } from "@chakra-ui/react";

function TwoGrid(props) {
    /**Renders up to 4 children in props.children */

    const childrenNumber = Math.min(React.Children.count(props.children), 2);

    let propsBoxes = [];

    for(let i = 0; i < childrenNumber; i++){
        propsBoxes.push(<Center>{props.children[i]}</Center>);
    }

    return (
        <Box
            height="100%"
            width="100%"
        >
                <SimpleGrid 
                    columns={{sm: 1, md: 2}}
                    gap={10} h="100%" w="100%">
                    {propsBoxes}
                </SimpleGrid>
        </Box>
    );
}

export default TwoGrid;