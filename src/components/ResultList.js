import React, { Component, Fragment } from 'react';
import APIFetch from './FetchFromApi';

class DisplayCards extends Component {
  state = {
    isLoaded: false,
    beers: []
  };

  //   function is passed to fetch component to fetch result array and set to state
  getBeers = fetchedData => {
    this.setState({ beers: fetchedData, isLoaded: true });
  };

  render() {
    const { beers, isLoaded } = this.state;
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
            <div className="food-card-title">
              <h1>
                {beer.food_pairing.filter(food => {
                  const check = food.toLowerCase();
                  const match = this.props.searchFor.toLowerCase();
                  return check.includes(match);
                })}
              </h1>
            </div>
            <div className="food-card-img">
              <img src="#" alt="#" />
            </div>
            <div className="food-card-description">#</div>
          </div>
        </div>
      );
    });
    const { searchFor } = this.props;
    return (
      <Fragment>
        <APIFetch food={searchFor} setListState={this.getBeers} />
        {!isLoaded ? <div className="loading">Loading...</div> : generateBeers}
      </Fragment>
    );
  }
}
export default DisplayCards;
