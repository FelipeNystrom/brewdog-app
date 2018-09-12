import React, { Component, Fragment } from "react";
import { Route } from "react-router-dom";

// Components to route
import StartPage from "./StartPage";
import Navbar from "./Navbar";
import Favorites from "./Favorites";
import Categories from "./Categories.js";
import DisplayCards from "./DisplayCards";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Navbar />

        <Route exact path="/" component={StartPage} />
        <Route
          path="/categories/:foodOrDessert"
          render={props => <Categories {...props} />}
        />

        <Route
          path="/favorites"
          render={props => (
            <div className="mainContainer">
              <div className="favoritesHeader">
                <h3>Favorites</h3>
              </div>

              <div className="container">
                <Favorites {...props} toggleView={this.toogleView} />
              </div>
            </div>
          )}
        />

        <Route
          path="/beers-to-match-with/:foodTypeToMatchWith"
          render={props => <DisplayCards {...props} />}
        />
      </Fragment>
    );
  }
}

export default App;
