import React from "react";
import { SimpleGrid, Center, Box } from "@chakra-ui/react";
import CardView from "./CardView";

function CardSection() {
    return (
        <Box
            bg="palette.600"
            height="100%"
            width="100%"
            scrollBehavior="inside"
            overflow="scroll"
        >
            <Center>
                <SimpleGrid columns={2} spacing={5} pt={5}>
                    <CardView />
                    <CardView />
                    <CardView />
                    <CardView />
                    <CardView />
                    <CardView />
                    <CardView />
                    <CardView />
                    <CardView />
                </SimpleGrid>
            </Center>
        </Box>
    );
}

export default CardSection;
