import React from "react";
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
		>
			{children}
		</Button>
	);
};

const Sidebar = (props) => {
	const handleCreate = (e) => {
		this.props.history.push("/create");
	};

	const handleExplore = (e) => {
		this.props.history.push("/explore");
	};

	const handleSettings = (e) => {
		this.props.history.push("/profile");
	};

	const handleLogout = (e) => {
		// log user out
		// remove their user data
		this.props.history.push("/");
	};

	const items = [
		[<AddIcon />, "Create a template", handleCreate],
		[<HiOutlineViewGrid />, "Your cards", handleCreate],
		[<FiGlobe />, "Explore templates", handleExplore],
		[<BiCalendarStar />, "Recommended", handleCreate],
		[<FiSettings />, "Settings", handleSettings],
		[<BiLogOut />, "Log out", handleLogout],
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

export default Sidebar;
