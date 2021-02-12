import React from "react";
import { Center, Box, VStack, HStack } from "@chakra-ui/react";
import CardSection from "../../components/CardSection";
import Title from "../../components/Title";

function Explore() {
	return (
		<div>
			<Center>
				<HStack mb={5}>
					<VStack>
						<Title text="Browse Cards" />
						<Box
							width="100%"
							height="80vh"
							borderRadius="sm"
							borderWidth="2px"
							boxShadow="md"
						>
							Featured card carousel goes here
						</Box>
					</VStack>
					<VStack>
						<Title text="Popular Cards" />
						<Box
							width="100%"
							height="80vh"
							borderRadius="sm"
							borderWidth="2px"
							boxShadow="md"
						>
							<CardSection />
						</Box>
					</VStack>
				</HStack>
			</Center>
		</div>
	);
}

export default Explore;
