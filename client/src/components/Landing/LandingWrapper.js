import React from "react";
import HeroSection from "../HeroSection.js";
import Header from "../Header/Header.js";
import Footer from "../Footer.js";
import background from "../../assets/backgroundLanding.png";
import backgroundDark from "../../assets/backgroundDark.png";
import PageWrapper from "../PageWrapper.js";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
export default function LandingWrapper(props) {
    const { colorMode } = useColorMode();
    const history = useHistory();
    return (
        <div
            style={{
                backgroundImage:
                    colorMode === "light"
                        ? `url(${background})`
                        : `url(${backgroundDark})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
        >
            <PageWrapper>
                <Header history={history} />
                <HeroSection />
            </PageWrapper>
            <Footer />
        </div>
    );
}
