import React from "react";
import ProfileCard from "../components/ProfileCard";
import {
	Box,
	Heading,
	Flex,
	Spacer,
	useColorModeValue,
	Text,
	Center,
	Image,
	SimpleGrid,
} from "@chakra-ui/react";

export function About() {
	const team = {
		1: [
			"Deval",
			"Backend",
			"https://avatars.githubusercontent.com/u/52225041?s=460&u=bf1a7189647feffd43336216798d03f355aa10bd&v=4",
		],
		2: [
			"Puneet",
			"Backend",
			"https://avatars.githubusercontent.com/u/59248728?s=460&u=0a22b50ceaddad3adf98a3dc8a1805784e340a40&v=4",
		],
		3: [
			"Emily",
			"Frontend",
			"https://avatars.githubusercontent.com/u/56324574?s=460&u=7aafc65318984e16232aca0307c70c96937e3d6d&v=4",
		],
		4: [
			"Raza",
			"Frontend",
			"https://avatars.githubusercontent.com/u/40725153?s=460&u=bba833f15c41a5aac0b80c8bf00c86c1581e4b2e&v=4",
		],
		5: [
			"Nivy",
			"Frontend",
			"https://avatars.githubusercontent.com/u/34191104?s=460&u=db9b373c76a9e9b36b59ad676cc1bed43d7155f9&v=4",
		],
		6: [
			"Georges",
			"Backend",
			"https://avatars.githubusercontent.com/u/25554513?s=460&v=4",
		],
		7: [
			"Mathieu",
			"Backend",
			"https://avatars.githubusercontent.com/u/22376697?s=460&u=666eeac03cfda4996e4b3d3ffa38b60c3b532ecf&v=4",
		],
	};

	return (
		<>
			<Center mt={10}>
				<Image
					borderRadius="full"
					boxSize="30px"
					src="https://www.freeiconspng.com/thumbs/info-icon/info-icon-32.png"
					alt="About icon"
					mr={5}
				/>
				<Heading>About the Project</Heading>
			</Center>
			<Box
				p={10}
				bg={useColorModeValue("palette.900", "palette.100")}
				m={10}
				borderRadius="lg"
			>
				<Text>
					Carden was made for the course CSC301H5 at University of
					Toronto Mississauga in Winter 2021. Something about the
					licensing. Something about who to contact and how. Something
					about thanking them for visiting the site and asking them
					for feedback.
				</Text>
			</Box>
			<Center mt={10}>
				<Image
					borderRadius="full"
					boxSize="30px"
					src="http://cdn.onlinewebfonts.com/svg/img_288547.png"
					alt="Team icon"
					mr={5}
				/>
				<Heading>Meet the Team</Heading>
			</Center>
			<Box
				p={10}
				bg={useColorModeValue("palette.900", "palette.100")}
				m={10}
				borderRadius="lg"
			>
				<SimpleGrid minChildWidth="200px" spacing={10}>
					{Object.entries(team).map(([key, value]) => (
						<ProfileCard
							role={value[1]}
							name={value[0]}
							img={value[2]}
						/>
					))}
				</SimpleGrid>
			</Box>
		</>
	);
}

export default About;
