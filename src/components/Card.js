import React, { Component, Fragment } from 'react';
import FoodPart from './FoodPart';
import './Card.css';

class Card extends Component {
  state = {
    showMore: false
  };

  // Toggle recipe part of card
  toggleCard = () => {
    this.setState({ showMore: !this.state.showMore });
  };

  render() {
    const { beer, recipeToMatch, searchFor } = this.props;
    const { showMore } = this.state;
    // Prepare beerinfo to send to db. Is passed to recipe component to be combined with recipe info
    const beerInfo = {
      beerName: beer.name,
      beerDescription: beer.description,
      beerImage: beer.image_url
    };
    return (
      <div className="card">
        <div className="beer-card">
          <div className="beer-card-info">
            <div className="beer-card-title">
              <div className="beer-name">{beer.name}</div>
              <div className="food-name">{recipeToMatch}</div>
            </div>
            <div className="beer-card-description">{beer.description}</div>
          </div>
          <div className="beer-card-img">
            <img src={beer.image_url} alt="#" />
          </div>
        </div>
        <div className={showMore ? 'divider-show' : 'divider-hidden'} />

        {/* toggle of recipe part happens here */}
        {!showMore ? (
          <button onClick={this.toggleCard}>Show Recipe</button>
        ) : (
          <Fragment>
            <FoodPart
              beerInfo={beerInfo}
              showMore={showMore}
              searchFor={searchFor}
              recipeToMatch={recipeToMatch}
            />
            <button onClick={this.toggleCard}>Hide Recipe</button>
          </Fragment>
        )}
      </div>
    );
  }
}

export default Card;
