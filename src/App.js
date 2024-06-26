import React, { useState } from "react";
import Signin from "./components/Signin/Signin";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import ParticlesBg from "particles-bg";
import "./App.css";
import Register from "./components/Register/Register";

function App() {
  //States
  const [searchBoxChange, setSearchBoxChange] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signin");
  const [isSignIn, setIsSignIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  });

  const loadUser = (dataUser) => {
    setUser({
      id: dataUser.id,
      name: dataUser.name,
      email: dataUser.email,
      entries: dataUser.entries,
      joined: dataUser.joined,
    });
  };

  //Events
  const onSearchChange = (event) => {
    //console.log("this is the event: ", event.target.value);
    setSearchBoxChange(event.target.value);
    console.log("Tiene texto: ", event.target.value);
  };

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data[0].region_info.bounding_box;
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

  /*const setUpAPI = (imgURL) => {
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
  };*/

  //Events
  const onButtonSubmit = () => {
    if (!user.id) {
      console.error("No user ID found");
      return;
    }
    fetch("https://smart-brain-api-2li6.onrender.com/imageURL", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imgURL: searchBoxChange,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          fetch("https://smart-brain-api-2li6.onrender.com/image", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              setUser({ ...user, entries: count });
            });
        }
        displayBox(calculateFaceLocation(result));
      })
      .catch((error) => console.log("error", error));
  };

  const onRouteChange = (route) => {
    if (route === "signout") {
      setSearchBoxChange("");
      setBox({});
      setIsSignIn(false);
      setUser({
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      });
    } else if (route === "home") {
      setIsSignIn("true");
    }
    setRoute(route);
  };
  return (
    <>
      <ParticlesBg type="cobweb" bg={true} />
      <Navigation isSignIn={isSignIn} onRouteChange={onRouteChange} />
      {route === "home" ? (
        <>
          <Logo />
          <Rank user={user} />
          <ImageLinkForm
            onSearchChange={onSearchChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition box={box} imgURL={searchBoxChange} />
        </>
      ) : route === "signin" ? (
        <>
          <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
        </>
      ) : route === "signout" ? (
        <>
          <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
        </>
      ) : (
        <>
          <Register loadUser={loadUser} onRouteChange={onRouteChange} />
        </>
      )}
    </>
  );
}

export default App;
