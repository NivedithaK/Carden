import React from "react";

import HeroSection from "../components/HeroSection.js";

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <HeroSection />
      </div>
    );
  }
}
