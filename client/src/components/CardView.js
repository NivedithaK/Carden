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
	Spacer,
	Box,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";

function CardView(props) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const history = useHistory();

	const handleUse = (e) => {
		e.preventDefault();
		// call load with template id 
		history.push("/create");
	};

	return (
		<>
			<Button
				{...props}
				borderRadius="xl"
				borderWidth="5px"
				borderColor="palette.100"
				bg="palette.500"
				onClick={onOpen}
				w="20vw" h="20vw" maxH="50vh" maxW = "50vw"
			></Button>
			<Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Preview template</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Center>
							<Box
								{...props}
								borderRadius="xl"
								borderWidth="5px"
								borderColor="palette.100"
								bg="palette.500"
								w="20vw" h="20vw" maxH="50vh" maxW = "50vw"
							></Box>
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
