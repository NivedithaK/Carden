import React, { useState, useEffect } from "react";
import {
    GridItem,
    Grid,
    Box,
    Flex,
    FormControl,
    FormLabel,
    Button,
    Text,
    InputGroup,
    Input,
    InputRightElement,
    Heading,
    Avatar,
    AvatarBadge,
    Center,
    useToast,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";
import background from "../../assets/backgroundLanding.png";
import Sidebar from "../SideBar/SideBar.js";
import Footer from "../Footer";
import backgroundDark from "../../assets/backgroundDark.png";
import { useHistory } from "react-router";
export default function ProfileView(props) {
    const [show, setShow] = useState(false);
    const toast = useToast();
    const id = "error-toast";
    const successId = "success-toast";
    const onClick = () => {
        setShow(!show);
    };
    const {
        username,
        setUsername,
        setEmail,
        setPassword,
        setConfirmPass,
        handleSubmit,
        errored,
        isLoggedin,
        updated,
        errorMsg,
    } = props.data;
    const history = useHistory();
    const { colorMode } = useColorMode();
    if (errored && !toast.isActive(id)) {
        toast({
            id: id,
            title: "Error Updating Profile",
            status: "error",
            description: errorMsg,
            duration: 3000,
            isClosable: true,
        });
    } else if (updated && !errored && !toast.isActive(successId)) {
        toast({
            id: successId,
            title: "Profile Update Successful",
            status: "success",
            description: "Successfully updated profile!",
            duration: 3000,
            isClosable: true,
        });
    }
    return (
        <div>
            <Flex
                flexDirection={["column", "column", "row", "row"]}
                justifyContent="center"
                backgroundImage={
                    colorMode === "light"
                        ? `url(${background})`
                        : `url(${backgroundDark})`
                }
                backgroundSize="cover"
            >
                <Sidebar isLoggedin={isLoggedin} history={history} />
                <Box
                    w={["95%", "85%", "60%", "60%"]}
                    h={["100%", "90%", "85%", "70%"]}
                    m="20px auto"
                    p="20px"
                    bg={colorMode === "light" ? "palette.700" : "palette.1100"}
                    borderRadius="25px"
                    boxShadow={colorMode == "light" ? "dark-lg" : "outline"}
                >
                    <form onSubmit={handleSubmit} className="form">
                        <Grid
                            templateColumns={[
                                "repeat(1, fr)",
                                "repeat(1, fr)",
                                "repeat(2, 1fr)",
                                "repeat(2, 1fr)",
                            ]}
                        >
                            <GridItem w="90%" m="auto">
                                <Center>
                                    <Heading>Profile</Heading>
                                </Center>
                                <Box
                                    w="70%"
                                    color={useColorModeValue(
                                        "palette.200",
                                        "palette.700"
                                    )}
                                    m="15px auto"
                                >
                                    <FormControl id="username" p="10px">
                                        <FormLabel>Username</FormLabel>
                                        <Input
                                            value={username}
                                            placeholder="Username"
                                            onChange={setUsername}
                                            isInvalid={
                                                errorMsg ==
                                                    "Username must be unique" ||
                                                errorMsg ==
                                                    "Username must be at least 5 characters"
                                                    ? true
                                                    : false
                                            }
                                        />
                                    </FormControl>
                                    <FormControl id="email" p="10px">
                                        <FormLabel>Email</FormLabel>
                                        <Input
                                            placeholder="Email Address"
                                            onChange={setEmail}
                                        />
                                    </FormControl>
                                    <FormControl id="password" p="10px">
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
                                                    onClick={onClick}
                                                >
                                                    {show ? "Hide" : "Show"}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                    </FormControl>
                                    <FormControl id="confirmPassword" p="10px">
                                        <FormLabel>Confirm Password</FormLabel>
                                        <InputGroup size="md">
                                            <Input
                                                type={
                                                    show ? "text" : "password"
                                                }
                                                placeholder="Confirm Password"
                                                onChange={setConfirmPass}
                                            />
                                            <InputRightElement width="4.5rem">
                                                <Button
                                                    h="1.75rem"
                                                    size="sm"
                                                    onClick={onClick}
                                                >
                                                    {show ? "Hide" : "Show"}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                    </FormControl>
                                </Box>
                            </GridItem>
                            <GridItem>
                                <Box w="60%" h="90%" m="10px auto">
                                    <Grid
                                        h="100%"
                                        templateColumns="repeat(1, 1fr)"
                                        gap={10}
                                        justifyItems="center"
                                        alignItems="center"
                                    >
                                        <Center m="auto">
                                            <Avatar
                                                size="2xl"
                                                name={username}
                                                src="https://bit.ly/broken-link"
                                            />
                                        </Center>
                                        <Center w="80%" m="auto">
                                            <Button
                                                w="100%"
                                                colorScheme="green"
                                                type="submit"
                                            >
                                                Save Settings
                                            </Button>
                                        </Center>
                                    </Grid>
                                </Box>
                            </GridItem>
                        </Grid>
                    </form>
                </Box>
            </Flex>
            <Footer />
        </div>
    );
}
