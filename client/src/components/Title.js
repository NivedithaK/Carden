import React from "react";
import { Heading, Box } from "@chakra-ui/react";

function Title(props) {
	return (
		<Box
			width="45vw"
			borderRadius="sm"
			borderWidth="2px"
			boxShadow="md"
			mt={5}
		>
			<Heading as="h5" size="md" p={5}>
				{props.text}
			</Heading>
		</Box>
	);
}

export default Title;
