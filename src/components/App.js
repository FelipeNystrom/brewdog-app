import React, { Component } from "react";
import StartPage from "./StartPage";
import Navbar from "./Navbar";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <StartPage />
      </div>
    );
  }
}

export default App;
