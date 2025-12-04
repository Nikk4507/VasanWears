import React from "react";
import HeroSlider from "../components/Common/HeroSlider";
import HowItWorks from "../components/Common/HowItWorks";
import HeroShowcase from "../components/Common/HeroShowcase";

const HomePage = () => {
  return (
    <>
      <HeroSlider />
      <HowItWorks />
      <HeroShowcase />
      <div className="h-80 bg-primary3/30"></div>
      <div className="h-80 bg-slate-100"></div>
    </>
  );
};

export default HomePage;
