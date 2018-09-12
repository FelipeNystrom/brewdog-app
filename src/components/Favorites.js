import React, { Component, Fragment } from "react";
import firebase from "./firebase";
import { Redirect } from "react-router-dom";
import ShowMore from "react-show-more";
import "./Card.css";

// Converter from DB-object to Array in state
function toArray(firebaseObject) {
  let array = [];
  for (let item in firebaseObject) {
    array.push({ ...firebaseObject[item], key: item });
  }
  return array;
}

class Favorites extends Component {
  state = {
    hasNoFavorites: false,
    redirect: false,
    userFavorites: [],
    userName: "",
    loggedIn: false,
    loggedOutMessage: "Please login too see your favorites",
    showLogOutMessage: false
  };
  // switch to prevent processes to run after unmount
  mounted = true;

  componentDidMount() {
    if (this.mounted) {
      this.auth();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  // Login check, grab user id, run converter (db => array)
  auth = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        this.setState({ userName: user.uid, loggedIn: true });
        this.convertFromDatabase();
      } else {
        // User is signed out
        this.setState(
          {
            userName: "Please Login",
            userFavorites: [],
            loggedIn: false,
            hasNoFavorites: false,
            showLogOutMessage: true
          },
          () => {
            setTimeout(() => {
              this.setState({ redirect: true });
            }, 3000);
          }
        );
      }
    });
  };

  // Helper function to fetch and convert user data
  convertFromDatabase = () => {
    firebase
      .database()
      .ref(`/users/${this.state.userName}`)
      .on("value", snapshot => {
        const favorites = toArray(snapshot.val());
        if (favorites.length !== 0) {
          this.setState({ userFavorites: favorites });
        } else {
          this.setState({ hasNoFavorites: true });
        }
      });
  };

  deleteFavoriteFromDB = fav => {
    firebase
      .database()
      .ref(`/users/${this.state.userName}/${fav.key}`)
      .remove();
    this.convertFromDatabase();
  };

  render() {
    // Maps through favorites-array and returns favorite-cards
    const {
      userFavorites,
      loggedIn,
      hasNoFavorites,
      showLogOutMessage,
      loggedOutMessage,
      redirect
    } = this.state;

    console.log(this.props);

    const listFavorites = userFavorites.map(fav => {
      const generateIngredients = fav.recipeIngredients.map((ingredient, i) => {
        return (
          <li className="ingredient-list-item" key={i}>
            {ingredient}
          </li>
        );
      });
      return (
        <div key={fav.key} className="card">
          <div className="beer-card">
            <div className="beer-card-info">
              <div className="beer-card-title" role="alert">
                <div className="beer-name">{fav.beerName}</div>
              </div>
              <div className="beer-card-description">
                <ShowMore
                  lines={4}
                  more="Show more"
                  less="Show less"
                  anchorClass=""
                >
                  {fav.beerDescription}
                </ShowMore>
              </div>
            </div>
            <div className="beer-card-img">
              <img src={fav.beerImage} alt="beer img" />
            </div>
          </div>

          <div className="food-card-info">
            <div className="food-card-title" role="alert">
              <span className="badge badge-info">Food match</span>
              <div className="food-name">{fav.recipeName}</div>
            </div>
            <div className="food-card-img">
              <img src={fav.recipeImage} alt="#" />
            </div>
          </div>
          <div className="food-card-description">
            <ul className="ingredient-list-title">{generateIngredients}</ul>
          </div>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => this.deleteFavoriteFromDB(fav)}
          >
            Remove from favorite
          </button>
        </div>
      );
    });
    return (
      <Fragment>
        {/* Is displayed during fetch */}
        {loggedIn &&
          userFavorites.length === 0 &&
          !hasNoFavorites && <div>Loading...</div>}
        {/* If user has no favorites show message */}
        {hasNoFavorites && <div>You have 0 favorites</div>}
        {/* Displays user favorites */}
        {loggedIn && userFavorites.length > 0 && listFavorites}
        {/* Is shown for 3 sec when user is logged out then triggers toggleView function which mounts default view  */}
        {showLogOutMessage && <p>{loggedOutMessage}</p>}
        {redirect && <Redirect to="/" />}
      </Fragment>
    );
  }
}

export default Favorites;
