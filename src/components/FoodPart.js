import React, { Component, Fragment } from 'react';

class FoodPart extends Component {
  state = {
    ingredients: [],
    name: '',
    image: '',
    fallback: false,
    finalfallback: false,
    isLoaded: false,
    show: false,
    searchUrls: []
  };
  componentDidMount() {
    const { showMore } = this.props;

    const { recipeToMatch, searchFor } = this.props;
    // const apiId = process.env.EDAMAME_API_ID;
    // const apiKey = process.env.EDAMAME_API_KEY;
    console.log(searchFor);
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

    const recipeSearchUrl = `https://api.edamam.com/search?q=${fixedString}&from=0&to=1&app_id=3a28c4f3&app_key=c6990b9b2689845c519d65f89dc29977`;
    const fallbackUrl = `https://api.edamam.com/search?q=${newSearchString}&from=0&to=1&app_id=3a28c4f3&app_key=c6990b9b2689845c519d65f89dc29977`;
    const finalFallBackUrl = `https://api.edamam.com/search?q=${finalFallback}+${lowerCaseSearch}&from=0&to=1&app_id=3a28c4f3&app_key=c6990b9b2689845c519d65f89dc29977`;

    if (showMore) {
      setTimeout(() => {
        this.setState({
          show: true,
          searchUrls: [recipeSearchUrl, fallbackUrl, finalFallBackUrl]
        });
      }, 10);
    }
  }

  componentDidUpdate(prevState) {
    const { fallback, finalfallback, searchUrls } = this.state;

    const { recipeToMatch } = this.props;
    const fixedString = this.noWhiteSpace(recipeToMatch[0]);

    if (!fallback && !finalfallback) {
      console.log(!fallback && !finalfallback);
      console.log(searchUrls[0]);
      fetch(searchUrls[0])
        .then(res => res.json())
        .then(result => {
          if (result.hits.includes(fixedString)) {
            this.setState({
              ingredients: result.hits[0].recipe.ingredientLines,
              name: result.hits[0].recipe.label,
              image: result.hits[0].recipe.image,
              isLoaded: true
            });
          } else {
            this.setState({ fallback: true });
          }
        });
    }

    if (fallback && !finalfallback) {
      console.log(fallback && !finalfallback);
      console.log(searchUrls[1]);
      fetch(searchUrls[1])
        .then(res => res.json())
        .then(result => {
          if (result.hits.length === 0) {
            this.setState({ finalfallback: true });
          } else {
            this.setState({
              ingredients: result.hits[0].recipe.ingredientLines,
              name: result.hits[0].recipe.label,
              image: result.hits[0].recipe.image,
              isLoaded: true
            });
          }
        });
    }

    if (fallback && finalfallback) {
      console.log(fallback && finalfallback);
      console.log(searchUrls[2]);
      fetch(searchUrls[2])
        .then(res => res.json())
        .then(result => {
          this.setState({
            ingredients: result.hits[0].recipe.ingredientLines,
            name: result.hits[0].recipe.label,
            image: result.hits[0].recipe.image,
            isLoaded: true
          });
        });
    }
  }

  noWhiteSpace = sentence => {
    const ws = /\s/g;
    return sentence.toLowerCase().replace(ws, '+');
  };
  render() {
    const { show, ingredients, name, image, isLoaded } = this.state;
    const generateIngredients = ingredients.map((ingredient, i) => {
      return (
        <li className="ingredient-list-item" key={i}>
          {ingredient}
        </li>
      );
    });
    return (
      <Fragment>
        <div className={`food-card ${show ? 'show' : 'hidden'}`}>
          {!isLoaded ? (
            <div>Loading...</div>
          ) : (
            <Fragment>
              <div className="food-card-info">
                <div className="food-card-title">
                  <h6>{name}</h6>
                </div>
                <div className="food-card-img">
                  <img src={image} alt="#" />
                </div>
              </div>
              <div className="food-card-description">
                <ul className="ingredient-list-title">
                  <h6 className="ingredients-list">List of ingredients</h6>
                  {generateIngredients}
                </ul>
              </div>
            </Fragment>
          )}
        </div>
      </Fragment>
    );
  }
}
export default FoodPart;
