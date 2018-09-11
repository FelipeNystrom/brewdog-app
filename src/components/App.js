import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './App.css';

// Components to route
import StartPage from './StartPage';
import Navbar from './Navbar';
import Favorites from './Favorites';
import Categories from './Categories.js';
import DisplayCards from './DisplayCards';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Route exact path="/" component={StartPage} />
        <Route
          path="/categories/:foodOrDessert"
          render={props => <Categories {...props} />}
        />
        <Route
          path="/favorites"
          render={() => <Favorites toggleView={this.toogleView} />}
        />
        <Route
          path="/beers-to-match-with/:foodTypeToMatchWith"
          render={props => <DisplayCards {...props} />}
        />
      </div>
    );
  }
}

export default App;
