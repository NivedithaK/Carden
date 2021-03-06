import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import logo from "../../assets/logo.png";
import logoDark from "../../assets/logo-white.png";
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
            variant="ghost"
            mt={{ base: 4, md: 0 }}
            mr={6}
            display="block"
            onClick={handleClick}
            color={useColorModeValue("palette.200", "palette.700")}
        >
            {children}
        </Button>
    );
};

const Header = (props) => {
    const [show, setShow] = React.useState(false);
    const { colorMode, toggleColorMode } = useColorMode();
    const mode = localStorage.getItem("chakra-ui-color-mode");
    const handleToggle = () => setShow(!show);

    const {
        handleLogin,
        handleAbout,
        handleSignup,
        handleHome,
    } = props.handlers;
    const handleDarkMode = (e) => {
        // e.preventDefault();
        toggleColorMode();
    };
    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            padding="1.5rem"
            {...props}
        >
            <Flex mr={5}>
                <Button width="180px" onClick={handleHome} variant="ghost">
                    <Image
                        src={colorMode === "light" ? logo : logoDark}
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
                            borderRadius="lg"
                            bg={useColorModeValue("palette.100", "palette.200")}
                            color="white"
                            onClick={handleSignup}
                            _hover={{
                                color: useColorModeValue(
                                    "palette.200",
                                    "palette.900"
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
                        defaultChecked={mode === "light" ? false : true}
                    />
                </Stack>
            </Box>
        </Flex>
    );
};

export default Header;
