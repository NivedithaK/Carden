import React from "react";
import {
    GridItem,
    Grid,
    Box,
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
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";
export default function ErrorPopup(props) {
    const { error } = props;
    return (
        <Box
            w="100%"
            textAlign="center"
            m="20px"
            color="palette.100"
            fontSize="1.25rem"
        >
            {error.msg}
        </Box>
    );
}
