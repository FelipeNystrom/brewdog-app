import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import StartPage from './StartPage';
import Navbar from './Navbar';
import Favorites from './Favorites';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Route exact path="/" component={StartPage} />
        <Route
          path="/favorites"
          render={() => <Favorites toggleView={this.toogleView} />}
        />
      </div>
    );
  }
}

export default App;
