import React from "react";
import {Box, VStack, Heading, Flex } from "@chakra-ui/react";
import { SearchBar, SearchFilter } from "../components/SearchBar.js";
import {IndexedGallery} from "../components/ImageGallery.js";
import TwoGrid from "../components/FourGrid.js";
import CardViewWrapper from "../components/CardViewWrapper";

class Explore extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Flex 
					width="100%"
					height="100%"
					flex-direction="row"
					> 
					<Box
						height="100%"
						width="20%"
						> 
						**Insert Sidebar**
						{/**Place holder wrapper to mirror the sidebar's existence */}
					</Box>
					<Box
						width="80%"
						height="100%"
						p={8}
						>
						 <VStack mb={5} h="100%" bg="palette.500">
							<Heading color={"palette.200", "palette.600"} mr="auto"> Browse Templates </Heading>
							<VStack spacing="1em" w="100%">
									<SearchBar/>
									<SearchFilter/>
							</VStack>
							<Box w="100%" h="70vh">
								<IndexedGallery>
									{/**Place cards here */}
									<TwoGrid>
										<CardViewWrapper/>
										<CardViewWrapper/>
									</TwoGrid>
									<TwoGrid>
										<CardViewWrapper/>
										<CardViewWrapper/>
									</TwoGrid>
									<TwoGrid>
										<CardViewWrapper/>
										<Box>
											Test ext
										</Box>
									</TwoGrid>
									<TwoGrid>
										<Box>
											Test ext
										</Box>
										<CardViewWrapper/>
									</TwoGrid>
								</IndexedGallery>
							</Box>
						</VStack>
					</Box>
				</Flex>
				
			</div>
		);
	}
}

export default Explore;
