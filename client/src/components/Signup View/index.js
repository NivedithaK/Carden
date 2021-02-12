import React, { useState, useEffect } from "react";
import {
	Grid,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	useColorModeValue,
	Button,
	Center,
} from "@chakra-ui/react";

function View(props) {
	const [show, setShow] = React.useState(false);
	const handleClick = () => setShow(!show);
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
				w={["90%", "80%"]}
				m="10px auto"
				boxShadow="dark-lg"
				rounded="lg"
			>
				<Grid w="75%" h="100%" templateColumns="1fr">
					<Box
						w="100%"
						bg="white"
						color={useColorModeValue("palette.400", "palette.800")}
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
									"palette.400"
								)}
								type="submit"
								bg={useColorModeValue(
									"palette.800",
									"palette.400"
								)}
								w="50%"
								borderRadius="20px"
							>
								Signup
							</Button>
						</form>
					</Box>
					{/* <Box w="100%" h="100%" bg="blue.500">
            This is the image in the wireframe
          </Box> */}
				</Grid>
			</Center>
		</div>
	);
}

export default View;
