import React, { Component } from "react";
import StartPage from "./StartPage";
import Navbar from "./Navbar";

require("dotenv").config();
class App extends Component {
  render() {
    console.log(process.env);
    return (
      <div>
        <Navbar />
        <StartPage />
      </div>
    );
  }
}

export default App;
