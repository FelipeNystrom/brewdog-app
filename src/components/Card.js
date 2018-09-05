import React, { Component, Fragment } from 'react';
import FoodPart from './FoodPart';
import './Card.css';
import firebase from './firebase';

class Card extends Component {
  state = {
    showMore: false
  };
  // Function to save favorites to FirebaseDB
  saveToFavorites = beer => {
    firebase
      .database()
      .ref(`/users/testuser`)
      .push(beer);
    console.log('Successfully Saved!');
  };

  toggleCard = () => {
    this.setState({ showMore: !this.state.showMore });
  };

  render() {
    const { beer, recipeToMatch, searchFor } = this.props;
    const { showMore } = this.state;
    return (
      <div className="card">
        <div className="beer-card">
          <div className="beer-card-info">
            <div className="beer-card-title">
              <h4>{beer.name}</h4>
            </div>
            <div className="beer-card-description">{beer.description}</div>
          </div>
          <div className="beer-card-img">
            <img src={beer.image_url} alt="#" />
          </div>
        </div>
        <div className={showMore ? 'divider-show' : 'divider-hidden'} />

        {!showMore ? (
          <button onClick={this.toggleCard}>Show Recipe</button>
        ) : (
          <Fragment>
            <FoodPart
              showMore={showMore}
              searchFor={searchFor}
              recipeToMatch={recipeToMatch}
            />
            <button onClick={this.toggleCard}>Hide Recipe</button>
          </Fragment>
        )}

        <button onClick={() => this.saveToFavorites(beer)}>Save</button>
      </div>
    );
  }
}

export default Card;
