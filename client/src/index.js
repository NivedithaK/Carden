import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import "./styles/index.css";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <div class="wave-container">
      <Header />
      <HeroSection />
      </div>
    </ChakraProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
