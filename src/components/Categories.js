import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

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
        <button>{dinner}</button>
      </Link>
    ));

    const listDesserts = dessertChoices.map((dessert, i) => (
      <Link key={i} to={`/beers-to-match-with/${dessert.toLowerCase()}`}>
        <button>{dessert}</button>
      </Link>
    ));
    const { typeOfFood } = this.state;
    const { history } = this.props;
    return (
      <Fragment>
        <button
          className="goBack"
          onClick={() => {
            history.goBack();
          }}
        >
          <i className="fas fa-arrow-circle-left" />
        </button>
        {typeOfFood === "dinner" ? listDinners : listDesserts}
      </Fragment>
    );
  }
}

export default Categories;
