import React, { createRef, useEffect } from 'react';
import { useScreenshot } from 'use-react-screenshot';
import Bird from '../assets/eren_bird.png';
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

function CardView(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { handler, index, templateId } = props;
    const history = useHistory();

    const handleUse = (e) => {
        e.preventDefault();
        // call load with template id
        history.push({pathname: '/create',
                      state: { templateId: templateId } });
    };

    const handleLike = (e) => {
        handler(index);
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
                {/* <ScreenShotRender> */}
                <Box>
                    <img src={Bird} alt='website logo' />
                </Box>
                {/* </ScreenShotRender> */}
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size='6xl' isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Preview template</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* <Center>
                            <Box
                                {...props}
                                borderRadius='xl'
                                borderWidth='5px'
                                borderColor='palette.100'
                                bg='palette.500'
                                w='20vw'
                                h='20vw'
                                maxH='50vh'
                                maxW='50vw'
                                alignItems='center'
                                justify='center'
                            > */}
                        {/* <div
                                style={{
                                    width: '300px',
                                    height: '300px',
                                    border: '5px solid #5bb18c',
                                    borderRadius: '5px',
                                }}
                            > */}
                        {/* <ScreenShotRender> */}
                        {/* <div
                                    // style={{
                                    //     width: '100%',
                                    //     height: '100%',
                                    // }}
                                    > */}
                        {/* <Box w='100%' h='100%'> */}
                        {/* <Center>
                                    <img src={Gift} alt='website logo' />
                                </Center> */}
                        {/* </Box> */}
                        {/* </div> */}
                        {/* </ScreenShotRender> */}
                        {/* </div> */}
                        {/* </Box>
                        </Center> */}
                        <Center>
                            <Box
                                borderRadius='xl'
                                borderWidth='5px'
                                borderColor='palette.100'
                                bg='palette.500'
                            >
                                <img src={Bird} alt='website logo' />
                            </Box>
                        </Center>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            leftIcon={<StarIcon />}
                            colorScheme='pink'
                            variant='solid'
                            onClick={handleLike}
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
