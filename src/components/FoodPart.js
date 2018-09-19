import React, { Component, Fragment } from 'react';
import firebase from './firebase';

import Loading from './Loading';

class FoodPart extends Component {
  state = {
    ingredients: [],
    name: '',
    image: '',
    fallback: false,
    finalfallback: false,
    isLoaded: false,
    show: false,
    searchUrls: [],
    shouldUpdate: false,
    userName: '',
    loggedIn: true
  };

  componentDidMount() {
    const { showMore } = this.props;
    const { recipeToMatch, searchFor } = this.props;
    // string manipulations method to build search query
    const lowerCaseSearch = searchFor.toLowerCase();
    const fixedString = this.noWhiteSpace(recipeToMatch[0]);
    const arrayFromSearchString = recipeToMatch[0].toLowerCase().split(' ');
    const cleanedString = arrayFromSearchString.filter(
      i => i !== lowerCaseSearch
    );
    const finalFallback =
      cleanedString[Math.floor(Math.random() * cleanedString.length)];

    const indexOfSearchWord = arrayFromSearchString.indexOf(lowerCaseSearch);

    arrayFromSearchString.length = indexOfSearchWord + 2;
    const newSearchString = arrayFromSearchString.join('+');
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiId = process.env.REACT_APP_API_ID;
    // search querys to use for fetch sequence
    // first search query
    const recipeSearchUrl = `https://api.edamam.com/search?q=${fixedString}&from=0&to=1&app_id=${apiId}&app_key=${apiKey}`;
    // second search query
    const fallbackUrl = `https://api.edamam.com/search?q=${newSearchString}&from=0&to=1&app_id=${apiId}&app_key=${apiKey}`;
    // third search query
    const finalFallBackUrl = `https://api.edamam.com/search?q=${finalFallback}+${lowerCaseSearch}&from=0&to=1&app_id=${apiId}&app_key=${apiKey}`;
    // Creates a delay to make class change possible. Updates component!
    if (showMore) {
      setTimeout(() => {
        this.auth(recipeSearchUrl, fallbackUrl, finalFallBackUrl);
      }, 10);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.mounted = true;

    const { fallback, finalfallback, searchUrls } = this.state;
    const { recipeToMatch } = this.props;
    // String manipulation remove whitespaces and replace with +
    const fixedString = this.noWhiteSpace(recipeToMatch[0]);

    // when component is updated try first search query fetch
    if (!fallback && !finalfallback) {
      fetch(searchUrls[0])
        .then(res => res.json())
        .then(result => {
          /*
            check if return is something

          */
          if (result.hits.length !== 0) {
            /*
            fixedString.replace('+', ' ').replace(/\b\w/g, l => l.toUpperCase())
            removes every plus with a space and transforms every first caharacter in
            in each word to uppercase. If results contains exact same title return
            result as perfect match

          */

            if (
              result.hits[0].recipe.label.includes(recipeToMatch) ||
              result.hits[0].recipe.label.includes(
                fixedString
                  .replace('+', ' ')
                  .replace(/\b\w/g, l => l.toUpperCase())
              )
            ) {
              this.setState({
                ingredients: result.hits[0].recipe.ingredientLines,
                name: result.hits[0].recipe.label,
                image: result.hits[0].recipe.image,
                isLoaded: true,
                shouldUpdate: false
              });
            }
            // if no return set state to trigger fallback fetch
            else {
              this.setState({ fallback: true });
            }
          } else {
            this.setState({ fallback: true });
          }
        });
    }
    // If state is updated
    if (prevState.shouldUpdate === this.state.shouldUpdate) {
      // Try second search query fetch
      if (fallback && !finalfallback) {
        fetch(searchUrls[1])
          .then(res => res.json())
          .then(result => {
            // if result is empty set state to trigger component update
            if (result.hits.length === 0) {
              this.setState({ finalfallback: true });
            } else {
              // if match set state and generate recipe
              this.setState({
                ingredients: result.hits[0].recipe.ingredientLines,
                name: result.hits[0].recipe.label,
                image: result.hits[0].recipe.image,
                isLoaded: true,
                shouldUpdate: false
              });
            }
          });
      }
      // Try third and final search query fetch
      if (fallback && finalfallback) {
        fetch(searchUrls[2])
          .then(res => res.json())
          .then(result => {
            // dislpay match
            this.setState({
              ingredients: result.hits[0].recipe.ingredientLines,
              name: result.hits[0].recipe.label,
              image: result.hits[0].recipe.image,
              isLoaded: true,
              shouldUpdate: false
            });
          });
      }
    }
  }

  componentWillUnmount() {
    // deactivate all running processes before unmount
    this.mounted = false;
  }

  saveToFavorites = () => {
    // build upon passed beer info object with additional recipe info
    const { ingredients, name, image } = this.state;
    let { beerInfo } = this.props;
    beerInfo.recipeIngredients = ingredients;
    beerInfo.recipeName = name;
    beerInfo.recipeImage = image;

    // pass to db
    firebase
      .database()
      .ref(`/users/${this.state.userName}`)
      .push(beerInfo);
    console.log('Successfully Saved!');
  };

  // remove whitespaces from sentence and replace with +
  noWhiteSpace = sentence => {
    const ws = /\s/g;
    return sentence.toLowerCase().replace(ws, '+');
  };

  /* Function for login-check. Takes thre arguments that is
     passed to search array if user exists or not in db. This
     to enable foodpairing functionality without login */
  auth = (first, second, third) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        this.setState({
          show: true,
          searchUrls: [first, second, third],
          shouldUpdate: true,
          loggedIn: true,
          userName: user.uid
        });
      } else {
        // User is signed out, user === null
        this.setState({
          show: true,
          searchUrls: [first, second, third],
          shouldUpdate: true,
          loggedIn: false,
          userName: ''
        });
      }
    });
  };

  render() {
    const {
      show,
      ingredients,
      name,
      image,
      isLoaded,
      userName,
      loggedIn,
      fallback,
      finalfallback
    } = this.state;
    const generateIngredients = ingredients.map((ingredient, i) => {
      return (
        <li className="ingredient-list-item" key={i}>
          {ingredient}
        </li>
      );
    });
    return (
      <Fragment>
        {!isLoaded ? (
          <Loading />
        ) : (
          <Fragment>
            <div className={`food-card ${show ? 'show' : 'hidden'}`}>
              <div className="food-card-badge">
                {!fallback &&
                  !finalfallback && (
                    <div className="badge badge-success">Perfect match!</div>
                  )}
                {fallback &&
                  !finalfallback && (
                    <div className="badge badge-warning">Similar match</div>
                  )}
                {fallback &&
                  finalfallback && (
                    <div className="badge badge-secondary">Surprise match</div>
                  )}
              </div>
              <div className="food-card-img">
                <img src={image} alt="#" />
              </div>
              <div className="food-card-info">
                <div className="food-card-title">
                  <h6>{name}</h6>
                </div>
                <div className="food-card-description">
                  <ul className="ingredient-list-title">
                    {generateIngredients}
                  </ul>
                </div>
              </div>
            </div>
            {/* // Buttons */}
            <div className="food-card-button">
              {loggedIn && userName !== '' ? (
                <button
                  className="btn btn-outline-success btn-sm"
                  onClick={this.saveToFavorites}
                >
                  Add to favorites
                </button>
              ) : (
                <button className="btn btn-outline-secondary btn-sm" disabled>
                  Login to favorite
                </button>
              )}
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  }
}
export default FoodPart;
