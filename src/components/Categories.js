import React, { Component, Fragment } from 'react';
import DisplayCards from './DisplayCards';

class Categories extends Component {
  render() {
    const dinnerChoices = ['Chicken', 'Beef', 'Pork', 'Lamb', 'Fish'];
    const dessertChoices = ['Chocolate', 'Ice Cream', 'Cheesecake', 'Cookies'];
    const listDinners = dinnerChoices.map((dinner, i) => (
      <button
        key={i}
        onClick={this.handleCategory}
        name="choice"
        value={dinner}
      >
        {dinner}
      </button>
    ));

    const listDesserts = dessertChoices.map((dessert, i) => (
      <button
        key={i}
        onClick={this.handleCategory}
        name="choice"
        value={dessert}
      >
        {dessert}
      </button>
    ));
    const { hasChoice, choice, meal } = this.props;
    return (
      <h1>hej</h1>
      // <Fragment>{meal === 'dinner' ? listDinners : listDesserts}</Fragment>
    );
  }
}

export default Categories;
