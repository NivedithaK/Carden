import React from "react";
import { useHistory } from "react-router-dom";
import {
	Box,
	Stack,
	Flex,
	Button,
	useColorModeValue,
	Spacer,
	Switch,
	Image,
} from "@chakra-ui/react";
import { MoonIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import logo from "../../assets/logo.png";

const MenuItems = ({ children, handleClick }) => {
	return (
		<Button
			variant="outline"
			borderRadius="20px"
			mt={{ base: 4, md: 0 }}
			mr={6}
			display="block"
			onClick={handleClick}
		>
			{children}
		</Button>
	);
};

const Header = (props) => {
	const [show, setShow] = React.useState(false);
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
	return (
		<Box width="100%">
			<Flex
				as="nav"
				align="center"
				justify="space-between"
				wrap="wrap"
				padding="1.5rem"
				bg={useColorModeValue("palette.800", "palette.900")}
				color="white"
				{...props}
			>
				<Flex mr={5}>
					<Image height="60px" src={logo} alt="Logo" />
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
									"palette.900"
								)}
								color={useColorModeValue(
									"palette.800",
									"palette.900"
								)}
								onClick={handleSignup}
							>
								Sign Up
							</Button>
						</Box>
						<MoonIcon ml="20px" />
						<Switch colorScheme="red" size="md" pl="10px" />
					</Stack>
				</Box>
			</Flex>
		</Box>
	);
};

export default Header;
