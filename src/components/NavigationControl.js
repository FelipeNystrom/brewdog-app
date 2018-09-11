import React, { Component } from 'react';
import './NavigationControl.css';

class NavigationControl extends Component {
  state = {
    canForward: false
  };

  componentDidMount() {
    const { history } = this.props;

    // make disabling of forward button possible if no forward
    if (history.action === 'POP') {
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
        <i
          className="fas fa-arrow-circle-left navigationButton"
          onClick={() => {
            history.goBack();
          }}
        />
        {!canForward ? (
          <i
            className="fas fa-arrow-circle-right navigationButtonDisabled"
            disabled
          />
        ) : (
          <i
            className="fas fa-arrow-circle-right navigationButton"
            onClick={() => {
              history.goForward();
            }}
          />
        )}
      </div>
    );
  }
}

export default NavigationControl;
