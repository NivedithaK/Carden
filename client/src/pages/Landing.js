import React from "react";
import HeroSection from "../components/HeroSection.js";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import background from "../assets/backgroundLanding.png";
import PageWrapper from "../components/PageWrapper.js";

export default class Landing2 extends React.Component {
	render() {
		return (
			<div
				style={{
					backgroundImage: `url(${background})`,
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
}
