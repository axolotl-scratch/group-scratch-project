import React, { Component } from "react";

import Input from "../Input";
import Button from "../Button";

const LoginForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        <label>Username: </label>
        <Input className="username" value="username" />
      </div>
      <div>
        <label>Password: </label>
        <Input className="password" value="password" />
      </div>
      <div>
        <Button className="button" text={props.loginText} />
      </div>
    </form>
  );
};

export default LoginForm;
