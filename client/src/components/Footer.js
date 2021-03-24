import React from "react";
import { Box, Text, useColorModeValue } from "@chakra-ui/react";

function Footer() {
    return (
		<Box
			bg={useColorModeValue("palette.100", "palette.1000")}
			p={3}
			textAlign="center"
		>
			<Text color="palette.500">Carden | Winter 2021</Text>
		</Box>
	);

}

export default Footer;
