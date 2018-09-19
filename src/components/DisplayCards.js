import React, { Component, Fragment } from 'react';
import APIFetch from './FetchFromApi';
import Card from './Card';
import Loading from './Loading';
import NavigationControl from './NavigationControl';
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
        this.setState({ userName: user.uid, loggedIn: true });
      } else {
        // User is signed out, user === null
        this.setState({ userName: '', loggedIn: false });
      }
    });
  };

  //   function is passed to fetch component to fetch result array and set to state
  getBeers = fetchedData => {
    this.setState({ beers: fetchedData, isLoaded: true });
  };

  render() {
    const { beers, isLoaded } = this.state;
    const { history } = this.props;
    const searchFor = this.props.match.params.foodTypeToMatchWith;

    // maps through state and creates a card from each index
    const generateBeers = beers.map(beer => {
      // return matching food title from array of diffrent dishes
      const recipeToMatch = beer.food_pairing.filter(food => {
        const check = food.toLowerCase();
        return check.includes(searchFor);
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
        <div className="mainContainer">
          <APIFetch food={searchFor} setListState={this.getBeers} />
          <div className="resultsHeader">
            <h3>Your match</h3>
          </div>
          <NavigationControl history={history} />
          <div className="container">
            {!isLoaded ? <Loading /> : generateBeers}
          </div>
        </div>
      </Fragment>
    );
  }
}
export default DisplayCards;
