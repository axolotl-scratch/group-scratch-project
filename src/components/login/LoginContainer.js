/*
This will contain the login forms
*/
import React, { Component } from "react";
import LoginForm from "./LoginForm.js";

const LoginContainer = (props) => {
  
  return (
    <section>
      <LoginForm onSubmit={onSubmit} text={props.text} />
    </section>
  );
};

export default LoginContainer;
