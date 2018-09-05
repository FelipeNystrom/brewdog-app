import React, { Component, Fragment } from 'react';
import APIFetch from './FetchFromApi';
import FoodPart from './FoodPart';
import firebase, {googleProvider} from './firebase';

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
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        // User is signed in.
        const loggedInUser = user.email;
        this.setState({ userName: loggedInUser, loggedIn: true });
        console.log(loggedInUser + ' LOGGED IN');
      } else {
        // User is signed out, user === null
        this.setState({ userName: '', loggedIn: false});
        console.log('NOT LOGGED IN');
      }
    })
  }

  //   function is passed to fetch component to fetch result array and set to state
  getBeers = fetchedData => {
    this.setState({ beers: fetchedData, isLoaded: true });
  };

  // Function to save favorites to FirebaseDB
  saveResult = (beer) => {
      firebase
      .database()
      .ref(`/users/testuser`) //replace testuser with userName-state
      .push(beer);
      console.log('Successfully Saved!');
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
              <h1>{recipeToMatch}</h1>
            </div>
          </div>
          <FoodPart searchFor={searchFor} recipeToMatch={recipeToMatch} />
          <button onClick={()=> this.saveResult(beer)}> Save </button>
        </div>
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
