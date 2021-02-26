import React from "react";
import { Box, Center } from "@chakra-ui/react";
import HeroSection from "../components/HeroSection.js";
import FeatureList from "../components/FeatureList.js";
import Drip from "../components/Drip.js";

export default class Landing extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Box>
                    <HeroSection />
                </Box>
                <Drip />

                <FeatureList />
            </div>
        );
    }
}
