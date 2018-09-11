import React, { Component, Fragment } from 'react';
<<<<<<< HEAD
import Categories from './Categories.js';
import './StartPage.css';

=======
import { Link } from 'react-router-dom';
>>>>>>> f9c7c3b11b03dbb3d073235f1a8c5759738765d3

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
<<<<<<< HEAD
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
=======
    return (
      <Fragment>
        <div>
          <h1>Beerit</h1>
          <h3>Match food with beer</h3>
          <h4>Choose meal</h4>
          <div>
            <Link to={`/categories/dinner`}>
              <button
>>>>>>> f9c7c3b11b03dbb3d073235f1a8c5759738765d3
                type="button"
                onClick={this.handleClick}
                name="meal"
                value="dinner"
                className="choiceButton dinner"
                >
                Dinner
              </button>
<<<<<<< HEAD
              </div>
              <div className="childDiv">
                <button
=======
            </Link>
            <Link to={`/categories/dessert`}>
              <button
>>>>>>> f9c7c3b11b03dbb3d073235f1a8c5759738765d3
                type="button"
                onClick={this.handleClick}
                name="meal"
                value="dessert"
                className="choiceButton dessert"
                >
                Dessert
              </button>
<<<<<<< HEAD
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
=======
            </Link>
          </div>
        </div>
>>>>>>> f9c7c3b11b03dbb3d073235f1a8c5759738765d3
      </Fragment>
    );
  }
}

export default StartPage;
