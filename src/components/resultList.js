import React, { Component, Fragment } from 'react';
import APIFetch from './fetchFromApi';

class DisplayCards extends Component {
  state = {
    beers: ['Loading...']
  };

  //   function is passed to fetch component to fetch result array and set to state
  getBeers = fetchedData => {
    this.setState({ beers: fetchedData });
  };

  render() {
    const { beers } = this.state;
    const generateBeers = beers.map(beer => {
      return (
        <div key={beer.id} className="card">
          <div className="beer-card">
            <div className="beer-card-title">{beer.name}</div>
            <div className="beer-card-img">
              <img src={beer.image_url} alt="#" />
            </div>
            <div className="beer-card-description">{beer.description}</div>
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
        <APIFetch food="veg" setListState={this.getBeers} />

        {generateBeers}
      </Fragment>
    );
  }
}
export default DisplayCards;
