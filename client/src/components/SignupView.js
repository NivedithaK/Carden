import React, { useState, useEffect } from "react";
import {
    Grid,
    Box,
    FormControl,
    FormLabel,
    Input,
    useColorMode,
    InputGroup,
    InputRightElement,
    useColorModeValue,
    Button,
    Center,
    Image,
    GridItem,
    Heading,
    VStack,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import background from "../assets/backgroundLanding.png";
import backgroundDark from "../assets/backgroundDark.png";
import PageWrapper from "../components/PageWrapper.js";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import paint from "../assets/paint.png";

function SignupView(props) {
    useEffect(() => {
        console.log(props.data);
    }, []);
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    const history = useHistory();

    const { colorMode } = useColorMode();
    const {
        setUsername,
        setPassword,
        setConfirmPassword,
        setEmail,
        handleSubmit,
    } = props.handlers;

    return (
        <div
            style={{
                backgroundImage:
                    colorMode === "light"
                        ? `url(${background})`
                        : `url(${backgroundDark})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
        >
            <PageWrapper>
                <Header />

                <Box
                    w="50%"
                    h="100%"
                    m="50px auto"
                    bg={useColorModeValue("palette.700", "palette.1000")}
                    boxShadow={colorMode === "light" ? "lg" : "outline"}
                    rounded="lg"
                    alignItems="center"
                >
                    <Center mt={10}>
                        <Heading
                            color={useColorModeValue(
                                "palette.200",
                                "palette.600"
                            )}
                        >
                            Sign up
                        </Heading>
                    </Center>
                    <Grid
                        height="100%"
                        width="100%"
                        templateColumns={{
                            sm: "repeat(1, 1fr)",
                            md: "repeat(2, 1fr)",
                        }}
                        templateRows={1}
                        gap={4}
                        p={10}
                        ml="auto"
                        mr="auto"
                    >
                        <GridItem
                            colStart={{ sm: 1, md: 2 }}
                            colEnd={{ sm: 1, md: 2 }}
                            display="flex"
                            justify-content="center"
                            margin="auto"
                        >
                            <Image
                                mt="50%"
                                w="150px"
                                objectFit="fit"
                                src={paint}
                                alt="Palatte"
                            />
                        </GridItem>
                        <GridItem
                            colStart={1}
                            colEnd={1}
                            display="flex"
                            justify-content="center"
                            margin="auto"
                        >
                            <form className="form">
                                <VStack spacing={3}>
                                    <FormControl id="username" isRequired>
                                        <FormLabel>Username</FormLabel>
                                        <Input
                                            placeholder="Username"
                                            onChange={setUsername}
                                        />
                                    </FormControl>
                                    <FormControl id="email" isRequired>
                                        <FormLabel>Email</FormLabel>
                                        <Input
                                            placeholder="Email Address"
                                            onChange={setEmail}
                                        />
                                    </FormControl>
                                    <FormControl id="password" isRequired>
                                        <FormLabel>Password</FormLabel>
                                        <InputGroup size="md">
                                            <Input
                                                placeholder="Password"
                                                onChange={setPassword}
                                                type={
                                                    show ? "text" : "password"
                                                }
                                            />
                                            <InputRightElement width="4.5rem">
                                                <Button
                                                    h="1.75rem"
                                                    size="sm"
                                                    onClick={handleClick}
                                                >
                                                    {show ? "Hide" : "Show"}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                    </FormControl>
                                    <FormControl
                                        id="confirmPassword"
                                        isRequired
                                    >
                                        <FormLabel>Confirm Password</FormLabel>
                                        <InputGroup size="md">
                                            <Input
                                                type={
                                                    show ? "text" : "password"
                                                }
                                                placeholder="Confirm Password"
                                                onChange={setConfirmPassword}
                                            />
                                            <InputRightElement width="4.5rem">
                                                <Button
                                                    h="1.75rem"
                                                    size="sm"
                                                    onClick={handleClick}
                                                >
                                                    {show ? "Hide" : "Show"}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                    </FormControl>
                                </VStack>
                            </form>
                        </GridItem>
                    </Grid>
                    <Button
                        ml="40%"
                        mt={5}
                        mb={10}
                        w="20%"
                        color={useColorModeValue("palette.500", "palette.700")}
                        bg={useColorModeValue("palette.100", "palette.900")}
                        borderRadius="20px"
                        onClick={handleSubmit}
                    >
                        Log In
                    </Button>
                </Box>
            </PageWrapper>
            <Footer />
        </div>
    );
}

export default SignupView;
