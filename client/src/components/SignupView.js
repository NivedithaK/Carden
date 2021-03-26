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
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

function SignupView(props) {
    useEffect(() => {
        console.log(props.data);
    }, []);
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    const history = useHistory();
    // const handleSubmit = (e) => {
    // 	e.preventDefault();
    // 	history.push("/dashboard");
    // };

    const { colorMode } = useColorMode();
    const {
        setUsername,
        setPassword,
        setConfirmPassword,
        setEmail,
        handleSubmit,
    } = props.handlers;

    return (
        <div>
            <Center
                w={["90%", "70%", "50%", "40%"]}
                m="10px auto"
                bg={useColorModeValue("palette.700", "palette.1000")}
                boxShadow={colorMode == "light" ? "dark-lg" : "outline"}
                rounded="lg"
            >
                <Grid w="75%" h="100%" templateColumns="1fr">
                    <Box
                        w="100%"
                        bg="white"
                        bg={useColorModeValue("palette.700", "palette.1000")}
                        color={useColorModeValue("palette.400", "palette.700")}
                        m="15px auto"
                    >
                        <form onSubmit={handleSubmit} className="form">
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
                            <FormControl id="confirmPassword" isRequired>
                                <FormLabel>Confirm Password</FormLabel>
                                <InputGroup size="md">
                                    <Input
                                        type={show ? "text" : "password"}
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
                                w="50%"
                                borderRadius="20px"
                            >
                                Signup
                            </Button>
                        </form>
                    </Box>
               
                </Grid>
            </Center>
        </div>
    );
}

export default SignupView;
