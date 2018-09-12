import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import './StartPage.css';

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
        <div className="mainContainer">
          <div className="headerContainer">
<<<<<<< HEAD
            <div className="firstHeader BG">
              <div>Beerit</div>
            </div>
            <div className="secondHeader BG">
              <div>Match food with beer</div>
            </div>
            <div className="thirdHeader ">
              <div>Choose meal</div>
            </div>
=======
          <h1>Beerit</h1>
          <h4>Matching food with beer</h4>
          <p>Choose meal to start:</p>
>>>>>>> 6cfd7c70b6a41a21e224f4e9bf4c7b5b1c6eb43c
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
