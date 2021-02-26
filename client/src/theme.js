import { extendTheme } from "@chakra-ui/react";

const config = {
    initialColorMode: "light",
    useSystemColorMode: false,
};

const breakpoints = ["360px", "768px", "1024px", "1440px"];
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];

const theme = extendTheme({
    config,
    breakpoints,
    colors: {
        palette: {
            100: "#ffc024", // Orange
            200: "#f7f7ee", // Off-white
            300: "#62d3d4", // Blue
            400: "#205d75", // Dark blue
            500: "#fea09e", // Pink
            600: "#525252", // Dark grey
            700: "#ffffff", // White
            800: "#826ad7", // Purple,
            900: "#b19cd9", // Light patel purple
            1000: "#1A202C",
        },
    },
    textStyles: {
        // h1: {
        //   fontSize: ["12px", "12px"],
        //   fontWeight: "bold",
        //   lineHeight: "110%",
        //   letterSpacing: "-2%",
        // },
        h2: {
            fontSize: ["36px", "48px"],
            fontWeight: "semibold",
            lineHeight: "110%",
            letterSpacing: "-1%",
        },
    },
});
export default theme;
