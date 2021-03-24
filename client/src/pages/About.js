import React from "react";
import ProfileCard from "../components/ProfileCard";

import {
	Box,
	Heading,
	useColorModeValue,
	Text,
	SimpleGrid,
	HStack,
} from "@chakra-ui/react";
import background from "../assets/backgroundLanding.png";
import PageWrapper from "../components/PageWrapper.js";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import { InfoOutlineIcon, ChatIcon } from "@chakra-ui/icons";

export function About() {
	const team = [
		{
			name: "Deval",
			role: "Backend",
			avatar:
				"https://avatars.githubusercontent.com/u/52225041?s=460&u=bf1a7189647feffd43336216798d03f355aa10bd&v=4",
		},
		{
			name: "Puneet",
			role: "Backend",
			avatar:
				"https://avatars.githubusercontent.com/u/59248728?s=460&u=0a22b50ceaddad3adf98a3dc8a1805784e340a40&v=4",
		},
		{
			name: "Mathieu",
			role: "Backend",
			avatar:
				"https://avatars.githubusercontent.com/u/22376697?s=460&u=666eeac03cfda4996e4b3d3ffa38b60c3b532ecf&v=4",
		},
		{
			name: "Nivy",
			role: "Frontend",
			avatar:
				"https://avatars.githubusercontent.com/u/34191104?s=460&u=db9b373c76a9e9b36b59ad676cc1bed43d7155f9&v=4",
		},
		{
			name: "Georges",
			role: "Backend",
			avatar:
				"https://avatars.githubusercontent.com/u/25554513?s=460&v=4",
		},
		{
			name: "Raza",
			role: "Frontend",
			avatar:
				"https://avatars.githubusercontent.com/u/40725153?s=460&u=bba833f15c41a5aac0b80c8bf00c86c1581e4b2e&v=4",
		},
		{
			name: "Emily",
			role: "Frontend",
			avatar:
				"https://avatars.githubusercontent.com/u/56324574?s=460&u=7aafc65318984e16232aca0307c70c96937e3d6d&v=4",
		},
	];

	return (
		<div
			style={{
				backgroundImage: `url(${background})`,
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
			}}
		>
			<PageWrapper>
				<Header />
				<Box w="80%" ml="auto" mr="auto" alignItems="center">
					<HStack mt={10} ml={10} spacing={5}>
						<Heading
							color={useColorModeValue(
								"palette.200",
								"palette.600"
							)}
						>
							About the Project
						</Heading>
						<Heading
							color={useColorModeValue(
								"palette.200",
								"palette.600"
							)}
						>
							💼
						</Heading>
					</HStack>
					<Box
						p={10}
						bg={useColorModeValue("palette.500", "palette.600")}
						m={10}
						borderRadius="lg"
					>
						<Text>
							Carden was made for the course CSC301H5 at
							University of Toronto Mississauga in Winter 2021.
							Something about the licensing. Something about who
							to contact and how. Something about thanking them
							for visiting the site and asking them for feedback.
						</Text>
					</Box>
					<HStack mt={10} ml={10}>
						<Heading
							color={useColorModeValue(
								"palette.200",
								"palette.600"
							)}
						>
							Meet the Team
						</Heading>
						<Heading
							color={useColorModeValue(
								"palette.200",
								"palette.600"
							)}
						>
							👋
						</Heading>
					</HStack>
					<SimpleGrid columns={4} spacing={10} m={10}>
						{team.map(({ name, role, avatar }) => (
							<ProfileCard role={role} name={name} img={avatar} />
						))}
					</SimpleGrid>
				</Box>
				<Footer />
			</PageWrapper>
		</div>
	);
}

export default About;
