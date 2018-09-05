import React, { Component, Fragment } from "react";
import DisplayCards from "./ResultList";

class Categories extends Component {
  // handleCategory = event => {
  //   this.setState({
  //     [event.target.name]: event.target.value,
  //     hasChoice: true
  //   });
  // };

  render() {
    const { hasChoice, choice } = this.props.state;
    return (
      <Fragment>
        {!hasChoice ? this.props.children : <DisplayCards searchFor={choice} />}

        {/* {this.props.choice === 'dinner' ? (
          <div>
            <h2>Choose type of dinner:</h2>
            {listDinners}
          </div>
        ) : (
          <div>
            <h2>Choose type of dessert:</h2>
            {listDesserts}
          </div>
        )} */}
      </Fragment>
    );
  }
}

export default Categories;
