import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavigationControl.css";

class NavigationControl extends Component {
  state = {
    canForward: false
  };

  componentDidMount() {
    const { history } = this.props;

    // make disabling of forward button possible if no forward
    if (history.action === "POP") {
      this.setState({ canForward: true });
    } else {
      this.setState({ canForward: false });
    }
  }

  render() {
    const { history } = this.props;
    const { canForward } = this.state;
    return (
      <div className="navigationWrapper">
        <div>
          <i
            className="fas fa-arrow-circle-left navigationButton"
            onClick={() => {
              history.goBack();
            }}
          />
        </div>
        <Link to="/">
          <i className="fas fa-home navigateHome" />
        </Link>
        {!canForward ? (
          <div>
            <i
              className="fas fa-arrow-circle-right navigationButtonDisabled"
              disabled
            />
          </div>
        ) : (
          <div>
            <i
              className="fas fa-arrow-circle-right navigationButton"
              onClick={() => {
                history.goForward();
              }}
            />
          </div>
        )}
      </div>
    );
  }
}

export default NavigationControl;
