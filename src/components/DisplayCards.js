import React, { Component, Fragment } from 'react';
import APIFetch from './FetchFromApi';
import Card from './Card';
import firebase from './firebase';

class DisplayCards extends Component {
  state = {
    isLoaded: false,
    beers: [],
    userName: '',
    loggedIn: false
  };

  // Runs a login-check on mount
  componentDidMount() {
    this.auth();
  }

  // Function for login-check
  auth = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        const loggedInUser = user.email;
        this.setState({ userName: loggedInUser, loggedIn: true });
        console.log(loggedInUser + ' LOGGED IN');
      } else {
        // User is signed out, user === null
        this.setState({ userName: '', loggedIn: false });
        console.log('NOT LOGGED IN');
      }
    });
  };

  //   function is passed to fetch component to fetch result array and set to state
  getBeers = fetchedData => {
    this.setState({ beers: fetchedData, isLoaded: true });
  };

  render() {
    const { beers, isLoaded } = this.state;
    const { searchFor } = this.props;

    // maps through state and creates a card from each index
    const generateBeers = beers.map(beer => {
      // return matching food title from array of diffrent dishes
      const recipeToMatch = beer.food_pairing.filter(food => {
        const check = food.toLowerCase();
        const match = this.props.searchFor.toLowerCase();
        return check.includes(match);
      });
      return (
        // card generation
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
