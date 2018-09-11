import React, { Component, Fragment } from "react";
import DisplayCards from "./DisplayCards";

class Categories extends Component {
  render() {
    const { hasChoice, choice } = this.props.state;
    return (
      <Fragment>
        {!hasChoice ? (
          this.props.children
        ) : (
          <div className="container">
            <DisplayCards searchFor={choice} />
          </div>
        )}
      </Fragment>
    );
  }
}

export default Categories;
