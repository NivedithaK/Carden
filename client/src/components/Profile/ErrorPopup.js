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
    const errorMsg = error.msg;
    return (
        <Box
            w="100%"
            textAlign="center"
            m="20px"
            color={useColorModeValue("palette.900", "palette.100")}
            fontSize="1.25rem"
        >
            {errorMsg}
        </Box>
    );
}
