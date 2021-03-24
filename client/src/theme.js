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
			100: "#5bb18c", // Main green
			200: "#58595a", // Dark grey
			300: "#fdfdf2", // Peach
			400: "#ffbe5a", // Orange
			500: "#ffffff", // White
			600: "#5ed7a0", // Light green

			700: "#ffffff", // White
			800: "#826ad7", // Main purple
			900: "#b19cd9", // Light pastel purple
			1000: "#1A202C", // Basically black
			1100: "#2b2b2b", // Lighter grey
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
