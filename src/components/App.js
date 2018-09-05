import React, { Component } from 'react';
import StartPage from './StartPage';
require('dotenv').config();
class App extends Component {
  render() {
    console.log(process.env);
    return (
      <div>
        <StartPage />
      </div>
    );
  }
}

export default App;
