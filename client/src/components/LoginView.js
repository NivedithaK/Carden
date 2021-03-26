import React, { useState } from "react";
import {
<<<<<<< HEAD
	Grid,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	useColorMode,
	InputRightElement,
	useColorModeValue,
	Button,
	Center,
=======
    Grid,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    useColorMode,
    InputRightElement,
    useColorModeValue,
    Button,
    Image,
    GridItem,
    Heading,
    Center,
>>>>>>> develop
} from "@chakra-ui/react";
import background from "../assets/backgroundLanding.png";
import backgroundDark from "../assets/backgroundDark.png";

import PageWrapper from "../components/PageWrapper.js";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import lock from "../assets/lock.png";
import ErrorPopup from "./Error/ErrorPopup";

function LoginView(props) {
<<<<<<< HEAD
	const [show, setShow] = useState(false);
	const handleClick = () => setShow(!show);
	const { colorMode } = useColorMode();
	const { setUsername, setPassword, handleLogin } = props.handlers;

	return (
		<div>
			<Center
				w={["90%", "70%", "50%", "40%"]}
				h="100%"
				m="50px auto"
				bg={useColorModeValue("palette.700", "palette.1000")}
				boxShadow={colorMode === "light" ? "2xl" : "outline"}
				rounded="lg"
			>
				<Grid w="75%" h="300px" templateColumns="1fr">
					<Box
						w="100%"
						h="175px"
						bg={useColorModeValue("palette.700", "palette.1000")}
						color={useColorModeValue("palette.400", "palette.700")}
						m="auto"
					>
						<form onSubmit={handleLogin} className="form">
							<FormControl id="username" isRequired>
								<FormLabel>Username</FormLabel>
								<Input
									placeholder="Username"
									onChange={setUsername}
								/>
							</FormControl>
							<FormControl id="password" isRequired>
								<FormLabel>Password</FormLabel>
								<InputGroup size="md">
									<Input
										placeholder="Password"
										onChange={setPassword}
										type={show ? "text" : "password"}
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
							<Button
								m="20px auto"
								color={useColorModeValue(
									"palette.700",
									"palette.700"
								)}
								type="submit"
								bg={useColorModeValue(
									"palette.800",
									"palette.900"
								)}
								borderRadius="20px"
								w="50%"
							>
								Log In
							</Button>
						</form>
					</Box>
					{/* <Box w="100%" h="100%" bg="blue.500">
            This is the image in the wireframe
          </Box> */}
				</Grid>
			</Center>
		</div>
	);
=======
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const { colorMode } = useColorMode();
    const { error } = props;
    console.log(error);
    const { setUsername, setPassword, handleLogin } = props.handlers;
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
                {error.id && <ErrorPopup error={error} />}
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
                            Log in
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
                                w="150px"
                                objectFit="fit"
                                src={lock}
                                alt="Lock"
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
                                <FormControl id="username" isRequired>
                                    <FormLabel>Username</FormLabel>
                                    <Input
                                        placeholder="Username"
                                        onChange={setUsername}
                                    />
                                </FormControl>
                                <FormControl id="password" isRequired mt={5}>
                                    <FormLabel>Password</FormLabel>
                                    <InputGroup size="md">
                                        <Input
                                            placeholder="Password"
                                            onChange={setPassword}
                                            type={show ? "text" : "password"}
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
                            </form>
                        </GridItem>
                    </Grid>
                    <Button
                        ml="40%"
                        mt={5}
                        mb={10}
                        w="20%"
                        color={useColorModeValue("palette.500", "palette.1000")}
                        type="submit"
                        bg={useColorModeValue("palette.100", "palette.400")}
                        borderRadius="20px"
                        onClick={handleLogin}
                    >
                        Log In
                    </Button>
                </Box>
            </PageWrapper>
            <Footer />
        </div>
    );
>>>>>>> develop
}

export default LoginView;
