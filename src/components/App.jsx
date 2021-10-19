import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import Modals from 'react-modal';
import Cookies from 'universal-cookie';

import Header from "./Header.js";
import LoginContainer from "./login/LoginContainer.js";
import Modal from "./modal/Modal.js";
import Button from "./Button.js";
import Compile from './compile/compileContainer.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalShow, setmodalShow] = useState(true);
  const [artists, setArtists] = useState([]);
  const [playlistName, setPlaylistName] = useState("");

  // useEffect(() => {
  //   console.log(Cookies.get('successful-login'));
  //   if(Cookies.get('successful-login')){
  //     setIsLoggedIn(true);
  //   }
  // });

  // const onClick = () =>{
  //   fetch('/login')
  // }



  
  // const history = useHistory();
  // const handleButtonClick = () => {
  //   history.push("/login")
  // };
  

  const homepageText = "MEIN GOTT MUSS DAS SEIN";
  
  const loginButtonText = "Login to Spotify";
  
  const createPlaylistText = "Create Playlist";

  if(!isLoggedIn){
  return (
    <Router>
    <div className="app">
      <h1 id="appHeader">Festival Playlistify</h1>
        <Link to="/login">
          Login with Spotify
          </Link>

    </div>

    </Router>
    );
  }
  else{
    return(
    <>
    <div>
      <Compile />
      <Modal show={state.modalShow} />
    </div>
    </>
    
    )
  }
}

export default App;

/*

<Button
  text={loginButtonText}
  onClick={handleButtonClick}
/>
*/

/* 
*/