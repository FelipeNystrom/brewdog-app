import React, { Component } from 'react';
import firebase from './firebase';


// Converter from DB-object to Array in state
function toArray(firebaseObject) {
  let array = []
  for (let item in firebaseObject) {
    array.push({ ...firebaseObject[item], key: item })
  }
  return array;
}

class Favorites extends Component {
  state = {
    userFavorites: [],
    userName: ''
  };

componentDidMount() {
  this.auth();
}

// Login check, grab user id, run converter (db => array)
auth = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // User is signed in.
      this.setState({ userName: user.uid, loggedIn: true });
      console.log(user.uid + " LOGGED IN");
      this.convertFromDatabase();
    } else {
      // User is signed out
      this.setState({
        userName: "Please Login",
        userFavorites: [],
        loggedIn: false
      });
      console.log("NOT LOGGED IN");
    }
  });
};

convertFromDatabase = () => {
  firebase
    .database()
    .ref(`/users/${this.state.userName}`)
    .on("value", snapshot => {
      const favorites = toArray(snapshot.val());
      this.setState({ userFavorites: favorites });
      console.log(this.state.userFavorites);
    });
}

deleteFavorite = (fav) => {
  firebase
  .database()
  .ref(`/users/${this.state.userName}/${fav.key}`)
  .remove();
  this.convertFromDatabase();
};

    render() {
      // Maps through favorites-array and returns favorite-cards
      const { userFavorites } = this.state;
      const listFavorites = userFavorites.map((fav) => {
        const generateIngredients = fav.recipeIngredients.map((ingredient, i) => {
          return (
            <li className="ingredient-list-item" key={i}>
              {ingredient}
            </li>
          );
        });
        return (<div key={fav.key}className="card">
          <div className="beer-card">
            <div className="beer-card-info">
              <div className="beer-card-title">
                <div className="beer-name">{fav.beerName}</div>
                <div className="food-name">{fav.recipeName}</div>
              </div>
              <div className="beer-card-description">{fav.beerDescription}</div>
            </div>
            <div className="beer-card-img">
              <img src={fav.beerImage} alt="#" />
            </div>
          </div>
          <div className="food-card-info">
            <div className="food-card-title">
              <h6>{fav.recipeName}</h6>
            </div>
            <div className="food-card-img">
              <img src={fav.recipeImage} alt="#" />
            </div>
          </div>
          <div className="food-card-description">
            <ul className="ingredient-list-title">
              <h6 className="ingredients-list">List of ingredients</h6>
              {generateIngredients}
            </ul>
          </div>
          <button onClick={() => this.deleteFavorite(fav)}> Delete </button>
        </div>)
      });
      return (
        <div>
        {listFavorites}
        {this.state.userName === 'Please Login' ? <p> Please login too see your favorites</p>
        : <p>Loading...</p>}
        </div>
      );
    }
  }

export default Favorites;
