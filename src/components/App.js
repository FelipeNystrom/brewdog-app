import React, { Component, Fragment } from 'react';
import './App.css';
import DisplayCards from './ResultList';
import StartPage from './StartPage';

class App extends Component {
  render() {
    return (
      <Fragment>
        <StartPage />
        <DisplayCards />
      </Fragment>
    );
  }
}

export default App;
