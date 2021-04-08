import React from "react";
import { Text, Box, useColorModeValue } from "@chakra-ui/react";

function Title(props) {
	return (
		<Box
			width="100%"
			borderRadius="sm"
			borderWidth="2px"
			boxShadow="md"
			bg={useColorModeValue("palette.800", "palette.1100")}
			color={useColorModeValue("palette.700", "palette.1100")}
			p={5}
			textStyle="h1"
		>
			{props.text}
		</Box>
	);
}

export default Title;
