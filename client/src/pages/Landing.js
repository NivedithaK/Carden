import React from "react";
import { Box } from "@chakra-ui/react";
import HeroSection from "../components/HeroSection.js";
import FeatureList from "../components/FeatureList.js";
import Drip from "../components/Drip.js";

export default class Landing extends React.Component {
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
