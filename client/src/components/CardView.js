import React, { useState } from "react";
import {
	Center,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Spacer,
	Text,
	VStack,
	Flex,
	Avatar,
	Box,
	Badge,
	GridItem,
	Grid,
} from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { useHistory } from "react-router-dom";

function CardView({ id, title, date, likes, handler }) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const history = useHistory();
	const handleUse = (e) => {
		e.preventDefault();
		history.push("/edit");
	};
	return (
		<>
			<VStack>
				<Button
					borderRadius="xl"
					bg="palette.500"
					width="250px"
					height="250px"
					onClick={onOpen}
				></Button>

				<Grid
					templateRows="repeat(2, 1fr)"
					templateColumns="repeat(3, 1fr)"
					w="80%"
				>
					<GridItem rowSpan={1} colSpan={2}>
						<Text fontWeight="bold">{title}</Text>
					</GridItem>
					<GridItem rowSpan={2} colSpan={1}>
						<Badge ml="1" colorScheme="pink" fontSize="1em">
							<Flex align="center">
								{likes} <AiFillHeart />
							</Flex>
						</Badge>
					</GridItem>
					<GridItem rowSpan={1} colSpan={2}>
						<Text fontSize="sm">{date}</Text>
					</GridItem>
				</Grid>
			</VStack>

			<Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Preview template</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Center>
							<CardView />
						</Center>
					</ModalBody>

					<ModalFooter>
						<Button
							leftIcon={<AiFillHeart />}
							colorScheme="pink"
							variant="solid"
							onClick={() => {
								handler(id);
								console.log(likes);
								// likes++;
							}}
						>
							Favourite
						</Button>
						<Spacer />
						<Button variant="ghost" onClick={onClose}>
							Return
						</Button>
						<Button colorScheme="blue" mr={3} onClick={handleUse}>
							Use this template
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export default CardView;
