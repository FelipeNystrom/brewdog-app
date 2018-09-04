import React, { Component } from 'react';
import Categories from './Categories.js';

//states
class StartPage extends Component {
  state = {
    meal: '',
    choiceIsMade: false
  };

  //onclick-event: changes state
  handleClick = event => {
    this.setState({
      [event.target.name]: event.target.value,
      choiceIsMade: true
    });
  };

  //return either start-page or filter-page
  render() {
    const { meal, choiceIsMade } = this.state;
    return (
      <div>
        {!choiceIsMade ? (
          <div>
            <h1>Beerit</h1>
            <h3>Match food with beer</h3>
            <h4>Choose meal</h4>
            <div>
              <button
                type="button"
                onClick={this.Click}
                name="meal"
                value="dinner"
              >
                Dinner
              </button>
              <button
                type="button"
                onClick={this.Click}
                name="meal"
                value="dessert"
              >
                Dessert
              </button>
            </div>
          </div>
        ) : (
          <Categories choice={meal} />
        )}
      </div>
    );
  }
}

export default StartPage;
