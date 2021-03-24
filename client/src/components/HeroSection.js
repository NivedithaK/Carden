import React from "react";
import { useHistory } from "react-router-dom";
import {
	Grid,
	GridItem,
	Circle,
	Image,
	Button,
	Heading,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import gift from "../assets/gift.png";

function HeroSection() {
	const history = useHistory();
	const handleExplore = (e) => {
		e.preventDefault();
		history.push("/explore");
	};

	return (
		<Grid
			height="100%"
			width="85vw"
			templateRows={{ sm: "repeat(3, 1fr)", md: "repeat(2, 1fr)" }}
			templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
			gap={4}
			p={10}
			ml="auto"
			mr="auto"
		>
			<GridItem
				colStart={{ sm: 1, md: 2 }}
				colEnd={{ sm: 1, md: 2 }}
				rowStart={{ sm: 3, md: 1 }}
				rowEnd={{ sm: 3, md: 3 }}
				display="flex"
				justify-content="center"
				margin="auto"
			>
				<Circle bg="white" w="300px" h="300px">
					<Image w="150px" objectFit="fit" src={gift} alt="Gift" />
				</Circle>
			</GridItem>

			<GridItem
				colStart={1}
				colEnd={1}
				rowStart={1}
				rowEnd={1}
				verticalAlign="sub"
			>
				<Heading mt="20%" as="h2" size="3xl">
					Create and send interactive cards
				</Heading>
			</GridItem>

			<GridItem colStart={1} colEnd={2} rowStart={2} rowEnd={2}>
				<Text display="flex" align-self="flex-end">
					Instead of sending your friend a text for their next
					birthday, send them a webpage. Choose from templates or make
					your own!
				</Text>
				<Button
					bg={useColorModeValue("palette.100", "palette.1000")}
					color="white"
					mt={5}
					pl={10}
					pr={10}
					onClick={handleExplore}
				>
					Explore Cards
				</Button>
			</GridItem>
		</Grid>
	);
}

export default HeroSection;
