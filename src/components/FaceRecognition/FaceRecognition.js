import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imgURL, box }) => {
  return (
    <>
      <div className="center ma">
        <div className="absolute mt5 mb5">
          <img
            id="inputimage"
            src={imgURL}
            alt=""
            width="500px"
            height="auto"
          />
          {Object.keys(box).length > 0 && (
            <div
              className="bounding-box"
              style={{
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol,
              }}
            ></div>
          )}

          {/* <div
            className="bounding-box"
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol,
            }}
          ></div>*/}
        </div>
      </div>
    </>
  );
};

export default FaceRecognition;
