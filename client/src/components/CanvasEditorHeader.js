import React, { useRef, useState } from 'react';
import Header from './Header';

import {
    Heading,
    Button,
    useDisclosure,
    useColorModeValue,
    Center,
    Grid,
    GridItem,
    VStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Box,
    Spacer,
    Divider,
} from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';

import { SelectionSceneMenu } from './EditorMenuItems.js';

function Share(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { templateid } = props;
    const [textArea, setTextArea] = useState(null);
    // const textAreaRef = useRef(null);

    const location = window.location.origin;
    const shareLink = templateid
        ? location + '/card/' + templateid
        : 'Please save the template in order to generate a share link!';
    const handleCopy = () => {
        // navigator.clipboard.writeText(shareLink);
        // For http
        textArea.select();
        document.execCommand('copy');
    };
    return (
        <div>
            <Button onClick={onOpen}>Share</Button>
            <Modal isOpen={isOpen} onClose={onClose} size='6xl' isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Share Link</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Center>
                            <Box>
                                {/* <h5>{shareLink}</h5> */}
                                {/* So copy works on http */}
                                <textarea
                                    readOnly
                                    style={{
                                        margin: '20px',
                                        resize: 'none',
                                        rows: 3,
                                        overflow: 'hidden',
                                        outline: 'none',
                                        width: '500px',
                                    }}
                                    ref={(textarea) => setTextArea(textarea)}
                                    value={shareLink}
                                />
                            </Box>
                        </Center>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            leftIcon={<CopyIcon />}
                            colorScheme='pink'
                            variant='solid'
                            onClick={handleCopy}
                        >
                            Copy
                        </Button>
                        <Spacer />
                        <Button variant='ghost' onClick={onClose}>
                            Return
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            {/* <form style={{ hidden: true }}>
                <textarea
                    style={{ display: 'none' }}
                    disabled={true}
                    ref={textAreaRef}
                    value={shareLink}
                />
            </form> */}
        </div>
    );
}

function CanvasEditorHeader(props) {
    return (
        <VStack>
            <Box width='100vw'>
                <Header />
                <Divider />
            </Box>
            <Grid
                {...props}
                bg={{
                    sm: useColorModeValue('palette.700'),
                    lg: useColorModeValue('palette.700'),
                }}
                templateColumns={{
                    sm: 'repeat(12, 1fr)',
                    md: 'repeat(12, 1fr)',
                    lg: 'repeat(30, 1fr)',
                    xl: 'repeat(36, 1fr)',
                }}
                templateRows={{
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(2, 1fr)',
                    lg: 'repeat(1, 1fr)',
                    xl: 'repeat(1, 1fr)',
                }}
            >
                <GridItem
                    colSpan={{ sm: 3, md: 3, lg: 6, xl: 6 }}
                    rowSpan={{ sm: 2, md: 2, lg: 1, xl: 1 }}
                >
                    <Heading size='lg'>Creating Template</Heading>
                </GridItem>
                <GridItem
                    colSpan={{ sm: 2, md: 2, lg: 2, xl: 2 }}
                    rowSpan={{ sm: 1, md: 1, lg: 1, xl: 1 }}
                >
                    <Center>
                        <Button onClick={props.save}>Save</Button>
                    </Center>
                </GridItem>
                <GridItem
                    colSpan={{ sm: 2, md: 2, lg: 2, xl: 2 }}
                    rowSpan={{ sm: 1, md: 1, lg: 1, xl: 1 }}
                >
                    <Center>
                        <Button onClick={props.load}>Load</Button>
                    </Center>
                </GridItem>
                <GridItem
                    colSpan={{ sm: 7, md: 7, lg: 8, xl: 8 }}
                    rowSpan={{ sm: 1, md: 1, lg: 1, xl: 1 }}
                >
                    <Center>
                        <Heading size='sm'>Current page: </Heading>

                        <SelectionSceneMenu
                            setScene={props.setScene}
                            numScenes={props.numScenes}
                            currentScene={props.currentScene}
                        />
                    </Center>
                </GridItem>
                <GridItem
                    colSpan={{ sm: 2, md: 2, lg: 2, xl: 2 }}
                    rowSpan={{ sm: 1, md: 1, lg: 1, xl: 1 }}
                >
                    <Center>
                        <Button onClick={props.addScene}>Add Page</Button>
                    </Center>
                </GridItem>
                <GridItem
                    colSpan={{ sm: 0, md: 0, lg: 6, xl: 12 }}
                    rowSpan={{ sm: 1, md: 1, lg: 1, xl: 1 }}
                >
                    <Center></Center>
                </GridItem>
                <GridItem
                    colSpan={{ sm: 2, md: 2, lg: 3, xl: 3 }}
                    rowSpan={{ sm: 1, md: 1, lg: 1, xl: 1 }}
                >
                    <Center>
                        <Share templateid={props.templateid} />
                    </Center>
                </GridItem>
            </Grid>
        </VStack>
    );
}

export default CanvasEditorHeader;
