import React from "react";
import { SimpleGrid, Center, Box } from "@chakra-ui/react";
import CardView from "./CardView";

function CardSection({ cards }) {
	const CardViews = cards.map((card) => {
		console.log(card.postDate);
		// const date =
		// 	card.postDate.getDate() +
		// 	"/" +
		// 	card.postDate.getMonth() +
		// 	"/" +
		// 	card.postDate.getFullYear();
		// 2021-03-12T07:27:16.195Z
		const date = card.postDate.slice(0, 10);

		return <CardView title={card.title} date={date} likes={card.stars} />;
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
					{/* <CardView />
					<CardView />
					<CardView />
					<CardView />
					<CardView />
					<CardView />
					<CardView />
					<CardView />
					<CardView /> */}
					{CardViews}
				</SimpleGrid>
			</Center>
		</Box>
	);
}

export default CardSection;
