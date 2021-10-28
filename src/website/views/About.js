import React, { useEffect } from "react";

import AboutInfo from "../components/About/AboutInfo";
import AboutStats from "../components/About/AboutStats";

const About = () => {
  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);
  
  return (
    <React.Fragment>
      <AboutInfo />
      <AboutStats />
    </React.Fragment>
  );
};

export default About;
