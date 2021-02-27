import React from "react";
import { useHistory } from "react-router-dom";
import {
    SimpleGrid,
    Button,
    Text,
    Heading,
    useColorModeValue,
} from "@chakra-ui/react";

function HeroSection() {
    const history = useHistory();
    const handleExplore = (e) => {
        e.preventDefault();
        history.push("/explore");
    };
    return (
		<SimpleGrid
			pt={5}
			pl={20}
			pr={10}
			columns={[1, 1, 2]}
			spacing={10}
			background={useColorModeValue("palette.800", "palette.1100")}
		>
			<SimpleGrid spacing={8}>
				<Heading
					align="left"
					textStyle="h1"
					size="3xl"
					color={useColorModeValue("palette.700", "palette.700")}
					maxW="90%"
				>
					Create and send interactive cards
				</Heading>
				<Text
					size="md"
					align="left"
					color={useColorModeValue("palette.700", "palette.700")}
					maxW="60%"
				>
					Instead of sending your friend a text for their next
					birthday, send them a webpage. Choose from templates or make
					your own!
				</Text>
				<Button
					borderRadius="20px"
					bg={useColorModeValue("palette.700", "palette.700")}
					onClick={handleExplore}
					color={useColorModeValue("palette.800", "palette.800")}
					maxW="200px"
					_hover={{
						color: useColorModeValue("palette.800", "palette.800"),
						background: useColorModeValue(
							"palette.200",
							"palette.200"
						),
					}}
				>
					Explore Cards
				</Button>
			</SimpleGrid>
			<img
				width="400px"
				src="https://cdn.dribbble.com/users/713003/screenshots/14705002/media/5194fe67dfeb5d4e3b8e73aa8fd0a511.gif"
				alt="Person studying"
			/>
		</SimpleGrid>
	);
}

export default HeroSection;
