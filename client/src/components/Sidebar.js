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
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
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
				bg: "#5ed7a0"
			}}
		>
			{children}
		</Button>
	);
};

function Sidebar() {
	const location = useLocation();
	console.log(location.pathname);
	const { colorMode, toggleColorMode } = useColorMode();
	const history = useHistory();
	const handleCreate = (e) => {
		e.preventDefault();
		history.push("/create");
	};
	const handleCards = (e) => {
		e.preventDefault();
		history.push("/dashboard");
	};
	const handleTemplates = (e) => {
		e.preventDefault();
		history.push("/explore");
	};
	const handleSettings = (e) => {
		e.preventDefault();
		history.push("/profile");
	};
	const handleLogout = (e) => {
		e.preventDefault();
		history.push("/logout");
	};
	const handleHome = (e) => {
		e.preventDefault();
		history.push("/");
	};
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
				w="25%"
				h="100vh"
			>
				<Button
					width="180px"
					onClick={handleHome}
					variant="ghost"
					mb={10}
				>
					<Image src={logo} alt="Logo" />
				</Button>
				<SidebarItems
					handleClick={handleCreate}
					isActive={location.pathname == "/create"}
				>
					Create a card
				</SidebarItems>
				<SidebarItems
					handleClick={handleCards}
					isActive={location.pathname == "/dashboard"}
				>
					Your cards
				</SidebarItems>
				<SidebarItems
					handleClick={handleTemplates}
					isActive={location.pathname == "/explore"}
				>
					Browse templates
				</SidebarItems>
				<SidebarItems
					handleClick={handleSettings}
					isActive={location.pathname == "/profile"}
				>
					Settings
				</SidebarItems>
				<SidebarItems handleClick={handleLogout} isActive={false}>
					Log out
				</SidebarItems>
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
					/>
				</Center>
			</VStack>
		</>
	);
}

export default Sidebar;
