import React from "react";
import Tilt from "react-parallax-tilt";
import brain from "./brain.png";
import "./Logo.css";

const Logo = () => {
  return (
    <>
      <div className="ma4 mt0 washed-green">
        <Tilt className="Tilt br2 shadow-2">
          <div className="pa3">
            <img src={brain} alt="Logo" />
          </div>
        </Tilt>
      </div>
    </>
  );
};

export default Logo;
