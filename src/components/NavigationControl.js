import React, { Component } from 'react';
import './NavigationControl.css';

class NavigationControl extends Component {
  state = {
    canForward: false,
    totalHistory: 0
  };

  componentDidMount() {
    const { history } = this.props;
    if (history.action === 'POP') {
      this.setState({ canForward: true });
    } else {
      this.setState({ canForward: false });
    }
  }

  componentDidUpdate() {
    console.log('update');
    // const { history } = this.props;
    // console.log(window.history.length);
    // console.log(window.history.state);

    // if (this.props.history.length > this.state.totalHistory) {
    //   this.setState({ canForward: true });
    // }
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
