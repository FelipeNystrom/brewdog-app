import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import "./Categories.css";
import NavigationControl from "./NavigationControl";

class Categories extends Component {
  state = {
    typeOfFood: ""
  };

  componentDidMount() {
    const { match } = this.props;
    this.setState({ typeOfFood: match.params.foodOrDessert });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.match.params.foodOrDessert !==
      this.props.match.params.foodOrDessert
    ) {
      const { match } = this.props;
      this.setState({ typeOfFood: match.params.foodOrDessert });
    }
  }

  render() {
    const dinnerChoices = ["Chicken", "Beef", "Pork", "Lamb", "Fish"];
    const dessertChoices = ["Chocolate", "Ice Cream", "Cheesecake", "Cookies"];
    const listDinners = dinnerChoices.map((dinner, i) => (
      <Link key={i} to={`/beers-to-match-with/${dinner.toLowerCase()}`}>
        <button className="ingredientButton">{dinner}</button>
      </Link>
    ));

    const listDesserts = dessertChoices.map((dessert, i) => (
      <Link key={i} to={`/beers-to-match-with/${dessert.toLowerCase()}`}>
        <button className="ingredientButton">{dessert}</button>
      </Link>
    ));
    const { typeOfFood } = this.state;
    const { history } = this.props;
    console.log(history);
    return (
      <Fragment>
        <div className="mainContainer">
          <div className="ingredientsHeader">
            <h3>Choose ingredient</h3>
          </div>
          <NavigationControl history={history} />
          <div className="ingredientsWrapper">
            {typeOfFood === "dinner" ? listDinners : listDesserts}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Categories;
