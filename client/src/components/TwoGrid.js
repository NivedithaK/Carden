import React from 'react';
import { SimpleGrid, Center, Box } from '@chakra-ui/react';

function TwoGrid(props) {
    /**Renders up to 4 children in props.children */

    const childrenNumber = Math.min(React.Children.count(props.children), 2);
    let propsBoxes = [];

    if (childrenNumber > 1) {
        for (let i = 0; i < childrenNumber; i++) {
            propsBoxes.push(<Center key={i}>{props.children[i]}</Center>);
        }
    } else {
        propsBoxes.push(<Center key={1}>{props.children}</Center>);
    }

    return (
        <Box height='100%' width='100%'>
            <SimpleGrid
                columns={{ sm: 1, md: childrenNumber > 1 ? 2 : 1 }}
                gap={10}
                h='100%'
                w='100%'
            >
                {propsBoxes}
            </SimpleGrid>
        </Box>
    );
}

export default TwoGrid;
