import React, { Component } from "react";
import { ReactDom } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      faculty: [],
      fetched: false
    };
  };

  render() {
    return (
      
    <div className ="app">
      <h1 id="appHeader">Group Scratch Project</h1>
      
    </div>
  )
  }
}

export default App;