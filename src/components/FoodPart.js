import React, { Component, Fragment } from 'react';

class FoodPart extends Component {
  state = {
    ingredients: [],
    name: '',
    image: '',
    show: false
  };
  componentDidMount() {
    const { showMore } = this.props;
    if (showMore) {
      setTimeout(() => {
        this.setState({ show: true });
      }, 500);
    }

    const { recipeToMatch, searchFor } = this.props;
    // const apiId = process.env.EDAMAME_API_ID;
    // const apiKey = process.env.EDAMAME_API_KEY;
    console.log(searchFor);
    const ws = /\s/g;
    const fixedString = recipeToMatch[0].toLowerCase().replace(ws, '+');

    const arrayFromSearchString = recipeToMatch[0].toLowerCase().split(' ');
    const indexOfSearchWord = arrayFromSearchString.indexOf(
      searchFor.toLowerCase()
    );
    arrayFromSearchString.length = indexOfSearchWord + 2;
    const newSearchString = arrayFromSearchString.join('+');

    const recipeSearchUrl = `https://api.edamam.com/search?q=${fixedString}&from=0&to=1&app_id=3a28c4f3&app_key=c6990b9b2689845c519d65f89dc29977`;
    const fallbackUrl = `https://api.edamam.com/search?q=${newSearchString}&from=0&to=1&app_id=3a28c4f3&app_key=c6990b9b2689845c519d65f89dc29977`;
    fetch(recipeSearchUrl)
      .then(res => res.json())
      .then(result => {
        if (result.hits.includes(fixedString)) {
          this.setState({
            ingredients: result.hits[0].recipe.ingredientLines,
            name: result.hits[0].recipe.label,
            image: result.hits[0].recipe.image
          });
        } else {
          fetch(fallbackUrl)
            .then(res => res.json())
            .then(result => {
              this.setState({
                ingredients: result.hits[0].recipe.ingredientLines,
                name: result.hits[0].recipe.label,
                image: result.hits[0].recipe.image
              });
            });
        }
      });
  }
  render() {
    const { show, ingredients, name, image } = this.state;
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
          {!ingredients ? (
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
