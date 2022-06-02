import React from "react";
import { useHistory } from "react-router-dom";
import "./HeroSection.css";
import { ArrowRight } from "@material-ui/icons";

function HeroSection() {
  const history = useHistory();
  const handleClick = () => {
    history.push("/coffee");
  };
  return (
    <div className="hero-container">
      <img
        src="/images/Home/43-coffee-roasting-training.jpg"
        alt="hero-background"
      />
      <div className="hero-content">
        <h1>Freshly Roasted Coffee</h1>
        <p>
          Enjoy the special tatse of our coffee, roasted with passion, care and
          love
        </p>
        <p style={{ color: "#afa483" }}>
          <b>Fresh beans brew the best tasting cup</b>
        </p>
        <button onClick={handleClick} className="hero-button">
          Shop Roasted Coffee <ArrowRight fontSize="large" />
        </button>
      </div>
    </div>
  );
}

export default HeroSection;
