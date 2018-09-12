import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

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

  //return either start-page or filter-page
  render() {
    return (
      <Fragment>
      <div className="mainContainer">
          <div className="headerContainer">
          <h1>Beerit</h1>
          <h4>Matching food with beer</h4>
          <p>Choose meal to start:</p>
          </div>
          <div className="mealContainer">
          <div className="meal dinner">
            <Link to={`/categories/dinner`}>
              <div
                className="mealButton"
                onClick={this.handleClick}
                name="meal"
                value="dinner"
              >
                Dinner
              </div>
            </Link>
            </div>
            <div className="meal dessert">
            <Link to={`/categories/dessert`}>
              <div
                className="mealButton"
                onClick={this.handleClick}
                name="meal"
                value="dessert"
              >
                Dessert
              </div>
            </Link>
            </div>
            </div>
          </div>
      </Fragment>
    );
  }
}

export default StartPage;
