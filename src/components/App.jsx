import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Header from "./Header.js";
import LoginContainer from "./login/LoginContainer.js";
import Modal from "./modal/Modal.js";
import Button from "./Button.js";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // on submit of button
  const onSubmit = (e) => {
    console.log(e);
    // console.log(username);
    // console.log(password);
  };

  const homepageText = "MEIN GOTT MUSS DAS SEIN";

  const loginButtonText = "Login to Spotify";

  const createPlaylistText = "Create Playlist";

  return (
    <div className="app">
      <h1 id="appHeader">Festival Playlistify</h1>
{/* 
      <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/modal">Modal</Link>
          </li>

        </ul>
      </div>

        <Switch>
          <Header/>
          <Route exact path="/login">
            <LoginContainer onSubmit={onSubmit} text={loginButtonText} />
          </Route>

          <Route exact path="/modal">
            <Modal text={createPlaylistText} />
          </Route>

          <Route exact path="/">
            <form>
              <Button text={homepageText} />
            </form>
          </Route>
          
        </Switch>
      </Router> */}
    </div>
  );
}

export default App;
