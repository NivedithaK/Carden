import React from "react";
import { SimpleGrid, Center, Box } from "@chakra-ui/react";
import CardView from "./CardView";

function CardSection() {
    return (
		<Box
			bg="palette.200"
			width="100%"
            height="500px"
			scrollBehavior="inside"
			overflow="scroll"
		>
			<Center>
				<SimpleGrid columns={[1, 1, 3]} spacing={8} pt={5}>
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
