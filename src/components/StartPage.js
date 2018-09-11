import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

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
    return (
      <Fragment>
        <div>
          <h1>Beerit</h1>
          <h3>Match food with beer</h3>
          <h4>Choose meal</h4>
          <div>
            <Link to={`/categories/dinner`}>
              <button
                type="button"
                onClick={this.handleClick}
                name="meal"
                value="dinner"
              >
                Dinner
              </button>
            </Link>
            <Link to={`/categories/dessert`}>
              <button
                type="button"
                onClick={this.handleClick}
                name="meal"
                value="dessert"
              >
                Dessert
              </button>
            </Link>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default StartPage;
