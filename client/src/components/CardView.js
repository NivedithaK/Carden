import React from "react";
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
    Spacer
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

function CardView() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Button
				borderRadius="xl"
				bg="palette.500"
				width="250px"
				height="250px"
				onClick={onOpen}
			></Button>
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
							leftIcon={<StarIcon />}
							colorScheme="pink"
							variant="solid"
						>
							Favourite
						</Button>
						<Spacer />
						<Button variant="ghost" onClick={onClose}>
							Return
						</Button>
						<Button colorScheme="blue" mr={3} onClick={onClose}>
							Use this template
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export default CardView;
