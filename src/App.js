import React, { useState } from "react";
//import Signin from "./components/Signin/Signin";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import ParticlesBg from "particles-bg";
import "./App.css";

function App() {
  const [searchBoxChange, setSearchBoxChange] = useState("");
  const [box, setBox] = useState({});

  /*
   leftCol: 0,
    topRow: 0,
    rightCol: 0,
    bottomRow: 0,
  */

  const onSearchChange = (event) => {
    //console.log("this is the event: ", event.target.value);
    setSearchBoxChange(event.target.value);
    console.log("Tiene texto: ", event.target.value);
  };

  const calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  const displayBox = (box) => {
    console.log("Box object: ", box);
    setBox(box);
  };

  const setUpAPI = (imgURL) => {
    const PAT = "e567fefd866e4540b59318a28f099c0b";
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = "joecv10";
    const APP_ID = "test";
    // Change these to whatever model and image URL you want to use
    //const MODEL_ID = "face-detection";
    const IMAGE_URL = imgURL;

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: IMAGE_URL,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: raw,
    };

    return requestOptions;
  };

  const onButtonSubmit = () => {
    console.log("Click");
    fetch(
      "https://api.clarifai.com/v2/models/face-detection/outputs",
      setUpAPI(searchBoxChange)
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("This is the result: ", result);
        displayBox(calculateFaceLocation(result));
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <>
      {/* {<Signin />} */}
      <ParticlesBg type="cobweb" bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm
        onSearchChange={onSearchChange}
        onButtonSubmit={onButtonSubmit}
      />
      <FaceRecognition box={box} imgURL={searchBoxChange} />
    </>
  );
}

export default App;
