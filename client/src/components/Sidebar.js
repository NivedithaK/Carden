import React from "react";
<<<<<<< HEAD
import { Box, Button, useColorModeValue, VStack } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { HiOutlineViewGrid } from "react-icons/hi";
import { FiGlobe } from "react-icons/fi";
import { BiCalendarStar } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";

const SidebarItems = ({ children, handleClick, icon }) => {
	return (
		<Button
			variant="ghost"
			borderRadius="10px"
			onClick={handleClick}
			borderColor={useColorModeValue("palette.700", "palette.700")}
			color={useColorModeValue("palette.600", "palette.700")}
			leftIcon={icon}
			w="100%"
=======
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
				bg: "#5ed7a0",
			}}
>>>>>>> develop
		>
			{children}
		</Button>
	);
};

<<<<<<< HEAD
const Sidebar = (props) => {
	const handleExplore = (e) => {
		// e.preventDefault();
	};

	const handleLogout = (e) => {
		// log user out
		// remove their user data
		this.props.history.push("/");
	};

	const handleCreate = (e) => {
		this.props.history.push("/create");
	};

	const items = [
		[<AddIcon />, "Create a template", handleCreate],
		[<HiOutlineViewGrid />, "Your cards", handleCreate],
		[<FiGlobe />, "Explore templates", handleCreate],
		[<BiCalendarStar />, "Recommended", handleCreate],
		[<FiSettings />, "Settings", handleCreate],
		[<BiLogOut />, "Log out", handleCreate],
	];

	return (
		<Box
			h="100%"
			bg={useColorModeValue("palette.700", "palette.1100")}
			p={3}
		>
			<VStack>
				{items.map((selection) => {
					return (
						<SidebarItems
							handleClick={selection[2]}
							icon={selection[0]}
						>
							{selection[1]}
						</SidebarItems>
					);
				})}
			</VStack>
		</Box>
	);
};
=======
function Sidebar(props) {
	const { isLoggedin } = props;
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
	const handleLogin = (e) => {
		e.preventDefault();
		history.push("/login");
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
					/>
				</Center>
			</VStack>
		</>
	);
}
>>>>>>> develop

export default Sidebar;
