import React from "react";
import { useHistory } from "react-router-dom";
import {
    Box,
    Heading,
    Flex,
    Button,
    useColorMode,
    useColorModeValue,
    Spacer,
    Switch,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const MenuItems = ({ children, handleClick }) => {
    return (
        <Button
            variant="outline"
            borderRadius="20px"
            mt={{ base: 4, md: 0 }}
            mr={6}
            display="block"
            onClick={handleClick}
            borderColor={useColorModeValue("palette.700", "palette.700")}
            color={useColorModeValue("palette.700", "palette.700")}
        >
            {children}
        </Button>
    );
};

const Header = (props) => {
    const [show, setShow] = React.useState(false);
    const { colorMode, toggleColorMode } = useColorMode();
    const handleToggle = () => setShow(!show);
    const history = useHistory();
    const handleLogin = (e) => {
        e.preventDefault();
        history.push("/login");
    };
    const handleAbout = (e) => {
        e.preventDefault();
        history.push("/");
    };
    const handleSignup = (e) => {
        e.preventDefault();
        history.push("/signup");
    };
    const handleDarkMode = (e) => {
        // e.preventDefault();
        toggleColorMode();
    };
    return (
        <Box>
            <Flex
                as="nav"
                align="center"
                justify="space-between"
                wrap="wrap"
                padding="1.5rem"
                bg={useColorModeValue("palette.800", "paletter.600")}
                color={useColorModeValue("palette.700", "palette.700")}
                {...props}
            >
                <Flex mr={5}>
                    <Heading size="lg" as="button" onClick={handleAbout}>
                        Carden
                    </Heading>
                </Flex>

                <Box
                    align="right"
                    display={{ sm: "block", md: "none" }}
                    onClick={handleToggle}
                >
                    <svg
                        fill="white"
                        width="12px"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </Box>

                <Box
                    display={{ sm: show ? "block" : "none", md: "flex" }}
                    width={{ sm: "full", md: "auto" }}
                    alignItems="center"
                    flexGrow={1}
                >
                    <Spacer />
                    <MenuItems handleClick={handleAbout}>About</MenuItems>
                    <MenuItems handleClick={handleLogin}>Log In</MenuItems>
                    <Box
                        display={{ sm: show ? "block" : "none", md: "block" }}
                        mt={{ base: 4, md: 0 }}
                    >
                        <Button
                            borderRadius="20px"
                            bg={useColorModeValue("palette.200", "palette.200")}
                            color={useColorModeValue(
                                "palette.800",
                                "palette.600"
                            )}
                            onClick={handleSignup}
                            _hover={{
                                color: useColorModeValue(
                                    "palette.700",
                                    "palette.900"
                                ),
                                background: useColorModeValue(
                                    "palette.900",
                                    "palette.600"
                                ),
                            }}
                        >
                            Sign Up
                        </Button>
                    </Box>
                    {colorMode === "light" ? (
                        <MoonIcon ml="20px" />
                    ) : (
                        <SunIcon ml="20px" />
                    )}
                    <Switch
                        colorScheme="red"
                        size="md"
                        pl="10px"
                        onChange={handleDarkMode}
                    />
                </Box>
            </Flex>
        </Box>
    );
};

export default Header;
