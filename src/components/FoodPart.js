import React, { Component, Fragment } from 'react';

class FoodPart extends Component {
  state = {
    recipe
  };
  componentDidMount() {
    const apiId = process.env.EDAMAME_API_ID;
    const apiKey = process.env.EDAMAME_API_KEY;
    console.log(apiId);
    console.log(apiKey);
    const { recipeToMatch, searchFor } = this.props;
    const ws = /\s/g;
    const fixedString = recipeToMatch[0].toLowerCase().replace(ws, '+');

    const recipeSearchUrl = `https://api.edamam.com/search?q=${fixedString}&from=0&to=3&app_id=3a28c4f3&app_key=c6990b9b2689845c519d65f89dc29977`;
    fetch(recipeSearchUrl)
      .then(res => res.json())
      .then(console.log);
  }
  render() {
    const { recipeToMatch, show } = this.props;
    console.log();
    return (
      <Fragment>
        <div className={`food-card ${show ? 'show' : 'hidden'}`}>
          <div className="food-card-info">
            <div className="food-card-title">
              <h4>{recipeToMatch}</h4>
            </div>
            <div className="food-card-description">#</div>
          </div>
          <div className="food-card-img">
            <img src="#" alt="#" />
          </div>
        </div>
      </Fragment>
    );
  }
}
export default FoodPart;
