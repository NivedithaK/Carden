import React from "react";
import { useHistory } from "react-router-dom";
import {
    GridItem,
    Grid,
    Button,
    Box,
    Text,
    Heading,
    Center,
    useColorModeValue,
} from "@chakra-ui/react";

function HeroSection() {
    const history = useHistory();
    const handleExplore = (e) => {
        e.preventDefault();
        history.push("/explore");
    };
    return (
        <div>
            <Center color="white" textAlign="center">
                <Grid
                    h="400px"
                    templateRows="repeat(5, 1fr)"
                    templateColumns="repeat(15, 1fr)"
                    gap={9}
                >
                    <GridItem colSpan={8} colStart={2} rowStart={2} w="550px">
                        <Heading
                            align="left"
                            textStyle="h1"
                            size="3xl"
                            color={useColorModeValue(
                                "palette.800",
                                "palette.200"
                            )}
                        >
                            Create and send interactive cards
                        </Heading>
                    </GridItem>
                    <GridItem
                        rowSpan={3}
                        colStart={10}
                        colSpan={5}
                        rowStart={2}
                    >
                        <img
                            src="https://cdn.dribbble.com/users/2565022/screenshots/13873863/media/26f7365efaa8734508f34e640d92ba8d.gif"
                            alt="Person studying"
                        />
                    </GridItem>
                    <GridItem
                        colSpan={8}
                        colStart={2}
                        colEnd={8}
                        rowStart={3}
                        color={useColorModeValue("palette.600", "palette.200")}
                    >
                        <Text size="md" align="left">
                            Instead of sending your friend a text for their next
                            birthday, send them a webpage. Choose from templates
                            or make your own!
                        </Text>
                    </GridItem>
                    <GridItem colSpan={6} colStart={2} rowStart={4}>
                        <Button
                            borderRadius="20px"
                            bg={useColorModeValue("palette.800", "palette.900")}
                            onClick={handleExplore}
                            color={useColorModeValue(
                                "palette.700",
                                "palette.700"
                            )}
                        >
                            Explore Cards
                        </Button>
                    </GridItem>
                </Grid>
            </Center>
        </div>
    );
}

export default HeroSection;
