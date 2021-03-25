import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
export default function ErrorPopup(props) {
    const { error } = props;
    return (
        <>
            <Box
                w="50%"
                textAlign="center"
                m="20px auto"
                borderRadius="8px"
                color={useColorModeValue("palette.500", "palette.500")}
                fontSize="1.25rem"
                backgroundColor="palette.1200"
            >
                {error.id && error.msg.msg}
            </Box>
        </>
    );
}
