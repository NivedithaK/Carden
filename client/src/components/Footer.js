import React from "react";
import { Flex, Spacer, Text, useColorModeValue } from "@chakra-ui/react";

function Footer() {
    return (
        <Flex
            h="60px"
            bg={useColorModeValue("palette.800", "palette.1000")}
            pl={10}
            pr={10}
            alignItems="center"
        >
            <Text color="palette.700">Carden</Text>
            <Spacer />
            <Text color="palette.700">February 2021</Text>
        </Flex>
    );

}

export default Footer;
