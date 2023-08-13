import React, { useState } from "react";
import "./LandingPage.css";
import Footer from "../Footer/Footer";
import HeroSection from "../HeroSection/HeroSection";

function LandingPage() {


  return (
    <div className="landing-page"> 
     <HeroSection/>  
      <Footer />
    </div>
  );
}

export default LandingPage;

