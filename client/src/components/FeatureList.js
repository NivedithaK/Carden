import React from "react";
import { Search2Icon, EditIcon, LinkIcon } from "@chakra-ui/icons";
import { SimpleGrid, Heading, Box } from "@chakra-ui/react";
import Feature from "./Feature.js";

const messages = [
    "Search for a template",
    "Customize your card",
    "Send card to a friend",
];

const icons = [Search2Icon, EditIcon, LinkIcon];

function FeatureList() {
    return (
        <>
            <Heading align="center">How It Works:</Heading>
            <SimpleGrid
                maxW="100%"
                columns={{ sm: 1, md: 2, lg: 3 }}
                spacing={20}
                p={20}
            >
                {icons.map((icon, index) => {
                    return <Feature icon={icon} title={messages[index]} />;
                })}
            </SimpleGrid>
        </>
    );
}

export default FeatureList;
