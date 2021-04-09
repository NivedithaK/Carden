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
	useColorModeValue,
} from "@chakra-ui/react";

function ModalPopup(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {buttonText, children} = props;
	return (
		<>
			<Button
				borderRadius="xl"
				bg={useColorModeValue("palette.500", "palette.1000")}
				width="100%"
				height="100%"
                onClick={onOpen}
			>
                {buttonText}
            </Button>
			<Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Select an image for upload</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Center>
                            {children}
						</Center>
					</ModalBody>
					<ModalFooter>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}

export default ModalPopup;
