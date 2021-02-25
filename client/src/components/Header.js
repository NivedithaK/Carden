import React from "react";
import { useHistory } from "react-router-dom";
import logo from "../assets/logo.png";
import logoNoBg from "../assets/logo-no-bg.png";
import {
    Box,
    Stack,
    Flex,
    Button,
    useColorMode,
    useColorModeValue,
    Spacer,
    Switch,
    Image,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

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
                bg={useColorModeValue("palette.800", "paletter.800")}
                color={useColorModeValue("palette.700", "palette.700")}
                color="white"
                {...props}
            >
                <Flex mr={5}>
                    <Button
                        height="60px"
                        bg={useColorModeValue("palette.800", "palette.1000")}
                        _hover={useColorModeValue("palette.800", "palette.800")}
                        _active={useColorModeValue(
                            "palette.800",
                            "palette.900"
                        )}
                        onClick={handleAbout}
                    >
                        <Image
                            height="60px"
                            src={colorMode == "light" ? logo : logoNoBg}
                            alt="Logo"
                        />
                    </Button>
                </Flex>

                <Box
                    align="right"
                    display={{ sm: "block", md: "none" }}
                    onClick={handleToggle}
                >
                    {show ? <CloseIcon /> : <HamburgerIcon />}
                    <title>Menu</title>
                </Box>

                <Box
                    display={{ base: show ? "block" : "none", md: "block" }}
                    flexBasis={{ base: "100%", md: "auto" }}
                >
                    <Stack
                        spacing={3}
                        align="center"
                        justify={[
                            "center",
                            "space-between",
                            "flex-end",
                            "flex-end",
                        ]}
                        direction={["column", "row", "row", "row"]}
                        pt={[4, 4, 0, 0]}
                    >
                        <Spacer />
                        <MenuItems handleClick={handleAbout}>About</MenuItems>
                        <MenuItems handleClick={handleLogin}>Log In</MenuItems>
                        <Box
                            display={{
                                sm: show ? "block" : "none",
                                md: "block",
                            }}
                            mt={{ base: 4, md: 0 }}
                            align="center"
                        >
                            <Button
                                borderRadius="20px"
                                bg={useColorModeValue(
                                    "palette.200",
                                    "palette.200"
                                )}
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
                    </Stack>
                </Box>
            </Flex>
        </Box>
    );
};

export default Header;
