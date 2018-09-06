import React, { Component, Fragment } from 'react';
import DisplayCards from './DisplayCards';

class Categories extends Component {
  render() {
    const { hasChoice, choice } = this.props.state;
    return (
      <Fragment>
        {!hasChoice ? this.props.children : <DisplayCards searchFor={choice} />}
      </Fragment>
    );
  }
}

export default Categories;
