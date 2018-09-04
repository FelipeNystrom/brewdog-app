
import React, { Component, Fragment } from 'react';
import Categories from './Categories.js';

//states
class StartPage extends Component {
  state = {
    meal: '',
    choiceIsMade: false,
    choice: '',
    hasChoice: false
  };

  //onclick-event: changes state
  handleClick = event => {
    this.setState({
      [event.target.name]: event.target.value,
      choiceIsMade: true
    });
  };

  handleCategory = event => {
    this.setState({
      [event.target.name]: event.target.value,
      hasChoice: true
    });
  };

  //return either start-page or filter-page
  render() {
    const { meal, choiceIsMade } = this.state;
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
    return (
      <Fragment>
        {!choiceIsMade ? (
          <div>
            <h1>Beerit</h1>
            <h3>Match food with beer</h3>
            <h4>Choose meal</h4>
            <div>
              <button
                type="button"
                onClick={this.handleClick}
                name="meal"
                value="dinner"
              >
                Dinner
              </button>
              <button
                type="button"
                onClick={this.handleClick}
                name="meal"
                value="dessert"
              >
                Dessert
              </button>
            </div>
          </div>
        ) : (
          <Categories state={this.state}>
            {meal === 'dinner' ? listDinners : listDesserts}
          </Categories>
        )}
      </Fragment>
    );
  }
}

export default StartPage;
