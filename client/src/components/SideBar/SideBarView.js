import React from "react";
import {
    Button,
    VStack,
    useColorMode,
    useColorModeValue,
    Switch,
    Image,
    Center,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import logoDark from "../../assets/logo-white.png";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
const SidebarItems = ({ children, handleClick, isActive }) => {
    return (
        <Button
            bg={useColorModeValue("palette.100", "palette.1000")}
            color="white"
            mt={5}
            pl={10}
            pr={10}
            onClick={handleClick}
            w="70%"
            isActive={isActive}
            _active={{
                bg: "#5ed7a0",
            }}
        >
            {children}
        </Button>
    );
};

function SideBarView(props) {
    const location = useLocation();
    // console.log(location.pathname);
    const { colorMode, toggleColorMode } = useColorMode();
    const mode = localStorage.getItem("chakra-ui-color-mode");
    const {
        handleCreate,
        handleCards,
        handleTemplates,
        handleSettings,
        handleLogout,
        handleHome,
        handleLogin,
        handleSignup,
        isLoggedin,
    } = props.handlers;
    const handleDarkMode = (e) => {
        // e.preventDefault();
        toggleColorMode();
    };
    return (
        <>
            <VStack
                p={5}
                borderRadius="lg"
                bg={useColorModeValue("palette.300", "palette.1000")}
                w={["100%", "100%", "35%", "25%"]}
                h="100vh"
            >
                <Button
                    width="180px"
                    onClick={handleHome}
                    variant="ghost"
                    mb={10}
                >
                    <Image
                        src={colorMode === "light" ? logo : logoDark}
                        alt="Logo"
                    />
                </Button>
                {isLoggedin && (
                    <SidebarItems
                        handleClick={handleCards}
                        isActive={location.pathname == "/dashboard"}
                    >
                        Your cards
                    </SidebarItems>
                )}
                <SidebarItems
                    handleClick={handleCreate}
                    isActive={location.pathname == "/create"}
                >
                    Create a card
                </SidebarItems>
                <SidebarItems
                    handleClick={handleTemplates}
                    isActive={location.pathname == "/explore"}
                >
                    Browse templates
                </SidebarItems>
                {isLoggedin && (
                    <SidebarItems
                        handleClick={handleSettings}
                        isActive={location.pathname == "/profile"}
                    >
                        Settings
                    </SidebarItems>
                )}
                {isLoggedin ? (
                    <SidebarItems handleClick={handleLogout} isActive={false}>
                        Log out
                    </SidebarItems>
                ) : (
                    <>
                        <SidebarItems
                            handleClick={handleLogin}
                            isActive={false}
                        >
                            Log in
                        </SidebarItems>
                        <SidebarItems
                            handleClick={handleSignup}
                            isActive={false}
                        >
                            Sign up
                        </SidebarItems>
                    </>
                )}
                <Center pt={5}>
                    {colorMode === "light" ? (
                        <MoonIcon ml="20px" mr="5px" />
                    ) : (
                        <SunIcon ml="20px" mr="5px" />
                    )}
                    <Switch
                        colorScheme="red"
                        size="md"
                        pl="10px"
                        onChange={handleDarkMode}
                        defaultChecked={mode === "light" ? false : true}
                    />
                </Center>
            </VStack>
        </>
    );
}

export default SideBarView;
