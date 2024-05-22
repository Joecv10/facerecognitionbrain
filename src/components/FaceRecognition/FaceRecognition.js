import React from "react";

const FaceRecognition = ({ imgURL }) => {
  return (
    <>
      <div className="center ma">
        <div className="absolute mt5 mb5">
          <img
            src={imgURL}
            alt="Recognition item"
            width="500px"
            height="auto"
          />
        </div>
      </div>
    </>
  );
};

export default FaceRecognition;
