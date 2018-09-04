import React, { Component } from 'react';
import './App.css';
import APIFetch from './fetchFromApi';

class App extends Component {
  state = {
    beers: []
  };

  getBeers = fetchedData => {
    this.setState({ beers: fetchedData });
  };

  render() {
    return <APIFetch food="veg" setAppState={this.getBeers} />;
  }
}

export default App;
