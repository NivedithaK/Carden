import React, { createRef, useEffect } from 'react';
import { useScreenshot } from 'use-react-screenshot';
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
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { useHistory } from 'react-router-dom';
import ScreenShotRender from './Screenshot.js';

const simplePromise = new Promise(() => {
    setTimeout(() => {}, 100);
});

function CardView(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const history = useHistory();
    const handleUse = (e) => {
        e.preventDefault();
        history.push('/edit');
    };

    return (
        <>
            <Button
                {...props}
                borderRadius='xl'
                borderWidth='5px'
                borderColor='palette.100'
                bg='palette.500'
                onClick={onOpen}
                w='20vw'
                h='20vw'
                maxH='50vh'
                maxW='50vw'
            >
                <ScreenShotRender>
                    <Box>Card Preview Go BRRRRR</Box>
                </ScreenShotRender>
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size='6xl' isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Preview template</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Center>
                            {/* <Box
                                {...props}
                                borderRadius='xl'
                                borderWidth='5px'
                                borderColor='palette.100'
                                bg='palette.500'
                                w='20vw'
                                h='20vw'
                                maxH='50vh'
                                maxW='50vw'
                            > */}
                            <div
                                style={{
                                    width: '300px',
                                    height: '300px',
                                    border: '5px solid #5bb18c',
                                    borderRadius: '5px',
                                }}
                            >
                                <ScreenShotRender>
                                    {/* <div
                                    // style={{
                                    //     width: '100%',
                                    //     height: '100%',
                                    // }}
                                    > */}
                                    <Box w='100%' h='100%'>
                                        Card Preview Go BRRRRR
                                    </Box>
                                    {/* </div> */}
                                </ScreenShotRender>
                            </div>
                            {/* </Box> */}
                        </Center>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            leftIcon={<StarIcon />}
                            colorScheme='pink'
                            variant='solid'
                        >
                            Favourite
                        </Button>
                        <Spacer />
                        <Button variant='ghost' onClick={onClose}>
                            Return
                        </Button>
                        <Button colorScheme='blue' mr={3} onClick={handleUse}>
                            Use this template
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default CardView;
