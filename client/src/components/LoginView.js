import React, { useState } from "react";
import {
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
} from "@chakra-ui/react";

function LoginView(props) {
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
                boxShadow={colorMode == "light" ? "dark-lg" : "outline"}
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

}

export default LoginView;
