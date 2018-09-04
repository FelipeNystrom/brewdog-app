import React, { Component, Fragment } from 'react';

class FoodPart extends Component {
  componentDidMount() {
    const { recipeToMatch, searchFor } = this.props;
    const ws = /\s/g;
    const fixedString = recipeToMatch[0].toLowerCase().replace(ws, '%20');

    const recipeSearchUrl =
      'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    fetch(recipeSearchUrl + fixedString).then(res => res.json());
  }
  render() {
    console.log();
    return (
      <Fragment>
        <div className="food-card-img">
          <img src="#" alt="#" />
        </div>
        <div className="food-card-description">#</div>
      </Fragment>
    );
  }
}
export default FoodPart;
