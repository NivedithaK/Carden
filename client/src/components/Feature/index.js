import React from "react";
import {
	Flex,
	Text,
	Icon,
	HStack,
	useColorModeValue,
	Container,
    Center
} from "@chakra-ui/react";

function Feature(props) {
	return (
		<Flex
			alignItems="center"
			borderRadius="lg"
			borderWidth="1px"
			width="270px"
			height="200px"
			boxShadow="2xl"
		>
			<Center>
				<HStack spacing={5}>
					<Icon
						as={props.icon}
						w={30}
						h={30}
						color={useColorModeValue("palette.800", "palette.100")}
						ml={10}
						verticalAlign="baseline"
					/>
					<Container maxW="m">
						<Text
							fontSize="lg"
							color={useColorModeValue(
								"palette.600",
								"palette.100"
							)}
							maxW="100px"
						>
							{props.title}
						</Text>
					</Container>
				</HStack>
			</Center>
		</Flex>
	);
}

export default Feature;
