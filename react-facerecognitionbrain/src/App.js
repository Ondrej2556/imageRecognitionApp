import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import ParticlesBg from 'particles-bg'
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasAccount, setHasAccount] = useState(true);
  const[imageUrl, setImageUrl] = useState("");
  const [faceData,setFaceData] = useState([]);
  const [user, setUser] = useState({});

  //STORE IMAGE URL FROM INPUT
  const onInputChange = (event) =>{
    setImageUrl(event.target.value);
  }

    const onButtonSubmit = () => {
      //help me => user_id can be found in multiple ways, one way is in https://portal.clarifai.com/settings/profile 
      const USER_ID = "ondrej2556";

      // Your PAT (Personal Access Token) can be found in the portal under Authentification
      // help me => PAT can be found in https://portal.clarifai.com/settings/authentication (create one if necessary!)
      const PAT = "SECRET_KEY"; 

      // help me => App Id is just the name of your app on the portal. 
      const APP_ID = "my-first-application"; 

      // help me => https://help.clarifai.com/hc/en-us/articles/1500007677141-Where-to-find-your-Model-IDs-and-Model-Version-IDs
      const MODEL_ID = "face-detection";
      const MODEL_VERSION_ID = "6dc7e46bc9124c5c8824be4822abe105";
      const IMAGE_URL = imageUrl;

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

      //CALL CLARIFAI API FOR FACE DETECTION
      fetch(`https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`,requestOptions)
        .then((response) => response.json())
        .then((result) => {
          // IF RESULT WAS SUCCESSFULL THEN WE ADD SCORE TO THE LOGGED USER 
          if(result){
            fetch('http://localhost:3000/image', {
              method: "PUT",
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({id:user.id})
            })
              .then(response => response.json())
              .then(count => setUser({...user,entries:count}))
          }
          //STORE FACE DATA TO DRAW BOX AROUND FACE
          setFaceData(result.outputs[0].data.regions)
        })
        .catch((error) => console.log("error", error));

    };

    return (
      <div className="App">
            <Navigation  isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
            <Logo />
            {isLoggedIn ? <>
              <Rank userName={user.name} userCount={user.entries}/>
              <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit}/>
              <FaceRecognition faceData={faceData} imageUrl={imageUrl}/>
            </> : <>
              {hasAccount ? <SignIn setUser={setUser} setIsLoggedIn={setIsLoggedIn} setHasAccount={setHasAccount} /> : <Register setUser={setUser} setHasAccount={setHasAccount} setIsLoggedIn={setIsLoggedIn} /> }
            </>} 
        <ParticlesBg type="cobweb" num={250} bg={true} /> 
      </div>
    );
  }


export default App;
