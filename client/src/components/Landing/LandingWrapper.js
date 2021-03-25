import React from "react";
import HeroSection from "../HeroSection.js";
import Header from "../Header.js";
import Footer from "../Footer.js";
import background from "../../assets/backgroundLanding.png";
import backgroundDark from "../../assets/backgroundDark.png";
import PageWrapper from "../PageWrapper.js";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";
export default function LandingWrapper(props) {
    const { colorMode } = useColorMode();
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
                <Header />
                <HeroSection />
            </PageWrapper>
            <Footer />
        </div>
    );
}
