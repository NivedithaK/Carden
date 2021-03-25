import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
export default function StatusPopup(props) {
    const { error } = props;
    const errorMsg = error.msg;
    return (
        <>
            <Box
                w="80%"
                textAlign="center"
                m="20px auto"
                borderRadius="8px"
                color={useColorModeValue("palette.500", "palette.500")}
                fontSize="1.25rem"
                backgroundColor={
                    error.id == "PROFILE_FAILURE"
                        ? "palette.1200"
                        : "palette.100"
                }
            >
                {error.id == "PROFILE_FAILURE"
                    ? errorMsg
                    : "Profile Updated Succesfully!"}
            </Box>
        </>
    );
}
