import React from "react";
import { Box, Center } from "@chakra-ui/react";
import HeroSection from "../components/HeroSection.js";
import FeatureList from "../components/FeatureList.js";

export default class Landing extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Box bg="palette.800">
                    <HeroSection />
                </Box>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path
                        fill="#826ad7"
                        fill-opacity="1"
                        d="M0,128L60,122.7C120,117,240,107,360,133.3C480,160,600,224,720,229.3C840,235,960,181,1080,160C1200,139,1320,149,1380,154.7L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
                    ></path>
                </svg>
                <FeatureList />
            </div>
        );
    }
}
