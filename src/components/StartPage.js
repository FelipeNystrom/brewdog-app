import React, { Component, Fragment } from 'react';
import Categories from './Categories.js';
import './StartPage.css';


//states
class StartPage extends Component {
  state = {
    meal: "",
    choiceIsMade: false,
    choice: "",
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

  goBack = () => {
    this.setState({ choiceIsMade: false });
  };

  //return either start-page or filter-page
  render() {
    const { meal, choiceIsMade } = this.state;
    const dinnerChoices = ["Chicken", "Beef", "Pork", "Lamb", "Fish"];
    const dessertChoices = ["Chocolate", "Ice Cream", "Cheesecake", "Cookies"];

    const listDinners = dinnerChoices.map((dinner, i) => (
      <div
        key={i}
        onClick={this.handleCategory}
        name="choice"
        value={dinner}
        className="chooseIngredient"
      >
        {dinner}
      </div>
    ));

    const listDesserts = dessertChoices.map((dessert, i) => (
      <div
        key={i}
        onClick={this.handleCategory}
        name="choice"
        value={dessert}
        className="chooseIngredient"
      >
        {dessert}
      </div>
    ));
    return (
      <Fragment>
        {!choiceIsMade ? (
          <div className="mainContainer">
            <div className="textContainer">
              <h1>Beerit</h1>
              <h3>Match food with beer</h3>
              <h4>Choose meal</h4>
            </div>
            <div className="childDiv">
                <button
                type="button"
                onClick={this.handleClick}
                name="meal"
                value="dinner"
                className="choiceButton dinner"
                >
                Dinner
              </button>
              </div>
              <div className="childDiv">
                <button
                type="button"
                onClick={this.handleClick}
                name="meal"
                value="dessert"
                className="choiceButton dessert"
                >
                Dessert
              </button>
              </div>
          </div>
        ) : (
          <Categories state={this.state}>
            <div className="mainContainer">
              <div className="textContainer">
                <h2>Choose main ingredient </h2>
              </div>
              <div className="childDiv">
              {meal === "dinner" ? listDinners : listDesserts}
              </div>
              <div>
              <button className="chooseIngredient" onClick={this.goBack}>Back</button>
              </div>
            </div>
          </Categories>
        )}
      </Fragment>
    );
  }
}

export default StartPage;
