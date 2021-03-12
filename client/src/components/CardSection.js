import React from "react";
import { SimpleGrid, Center, Box } from "@chakra-ui/react";
import CardView from "./CardView";

function CardSection({ cards, handler }) {
	const CardViews = cards.map((card) => {
		const date = card.postDate.slice(0, 10);

		return (
			<CardView
				id={card._id}
				title={card.title}
				date={date}
				likes={card.stars}
				handler={handler}
			/>
		);
	});
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
					{CardViews}
				</SimpleGrid>
			</Center>
		</Box>
	);
}

export default CardSection;
