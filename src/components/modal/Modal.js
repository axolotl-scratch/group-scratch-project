/*
After the user is logged in, they will be redirected to this page. 
This page will contain the logic to call the Spotify API to create a new blank playlist
After creating a playlist, the user will be redirected to the home page
*/
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Input from "../Input";
import Button from "../Button";

const Modal = () => {
  const onSubmit = (e) =>{

  }

  return(
  <form onSubmit={onSubmit}>
    <Input classname="playlistName" value="playlistName" />
    <Button classname="modalsButton" value="playlistName" />
  </form>
  )
};

export default Modal;
