import React, { Component, Fragment } from 'react';
import APIFetch from './fetchFromApi';

class DisplayCards extends Component {
  state = {
    beers: []
  };

  //   function is passed to fetch component to fetch result array and set to state
  getBeers = fetchedData => {
    this.setState({ beers: fetchedData });
  };
  render() {
    const { beers } = this.state;
    const generateBeers = beers.map((beer, i) => {
      return (
        <div key={i} className="card">
          <div className="beer-card">
            <div className="beer-card-title">#</div>
            <div className="beer-card-img">
              <img src="#" alt="#" />
            </div>
            <div className="beer-card-description">#</div>
          </div>
          <div className="food-card">
            <div className="food-card-title">#</div>
            <div className="food-card-img">
              <img src="#" alt="#" />
            </div>
            <div className="food-card-description">#</div>
          </div>
        </div>
      );
    });
    return (
      <Fragment>
        <APIFetch food="veg" setAppState={this.getBeers} />
        {generateBeers}
      </Fragment>
    );
  }
}
export default DisplayCards;
