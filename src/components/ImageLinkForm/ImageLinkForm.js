import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = () => {
  return (
    <>
      <div className="center">
        <p className="f3 center">
          {
            "This magic brain will detec images in your pictures. Give it a try."
          }
        </p>
      </div>
      <div className="center">
        <div className="form pa4 br3 shadow-5">
          <input className="f4 pa2 w-70" type="text" />
          <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple">
            Detect
          </button>
        </div>
      </div>
    </>
  );
};

export default ImageLinkForm;