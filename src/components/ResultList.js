import React, { Component, Fragment } from 'react';
import APIFetch from './FetchFromApi';
import Card from './Card';
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
    const { searchFor } = this.props;
    const generateBeers = beers.map(beer => {
      const recipeToMatch = beer.food_pairing.filter(food => {
        const check = food.toLowerCase();
        const match = this.props.searchFor.toLowerCase();
        return check.includes(match);
      });
      return (
        <Card
          key={beer.id}
          searchFor={searchFor}
          recipeToMatch={recipeToMatch}
          beer={beer}
        />
      );
    });
    return (
      <Fragment>
        <APIFetch food={searchFor} setListState={this.getBeers} />

        {!isLoaded ? <div className="loading">Loading...</div> : generateBeers}
      </Fragment>
    );
  }
}
export default DisplayCards;
