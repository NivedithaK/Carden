import React from "react";
import { Box, Image, Text, Divider, useColorModeValue } from "@chakra-ui/react";

function ProfileCard(props) {
	return (
		<>
			<Box
				p={5}
				borderRadius="lg"
				bg={useColorModeValue("palette.700", "palette.100")}
			>
				<Image
					borderRadius="full"
					boxSize="100px"
					src={props.img}
					alt={props.name}
                    ml="auto"
                    mr="auto"
				/>
				<Divider mt={5} mb={5} />
				<Text align="center" fontWeight="bold">
					{props.name}
				</Text>
				<Text align="center">{props.role}</Text>
			</Box>
		</>
	);
}

export default ProfileCard;
