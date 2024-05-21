import React, { useState } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import ParticlesBg from "particles-bg";
import "./App.css";

function App() {
  const [searchBoxChange, setSearchBoxChange] = useState("");

  const onSearchChange = (event) => {
    console.log("this is the event: ", event.target.value);
    setSearchBoxChange(event.target.value);
  };

  const setUpAPI = (imgURL) => {
    const PAT = "e567fefd866e4540b59318a28f099c0b";
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = "joecv10";
    const APP_ID = "test";
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = "face-detection";
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
      "https://api.clarifai.com/v2/models/" + "face-detection" + "/outputs",
      setUpAPI(searchBoxChange)
    )
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
  return (
    <>
      <ParticlesBg type="cobweb" bg={true} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm
        onSearchChange={onSearchChange}
        onButtonSubmit={onButtonSubmit}
      />
      {/*<FaceRecognition/>*/}
    </>
  );
}

export default App;
