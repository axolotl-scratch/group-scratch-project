import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './Header.js';
import loginContainer from './loginContainer.js';



function App() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  // on submit of button
  const onSubmit = () => {

  }


  return (
    <div className="app">
      <h1 id="appHeader">Festival Playlistify</h1>
      <Header />

      <loginContainer />
    </div>
  )
}

export default App;