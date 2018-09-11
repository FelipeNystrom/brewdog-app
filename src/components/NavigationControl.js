import React, { Component } from 'react';
import './NavigationControl.css';

class NavigationControl extends Component {
  state = {
    canForward: false,
    totalHistory: 0
  };

  componentDidMount() {
    const { history } = this.props;
    console.log(history.length);
    this.setState({ totalHistory: history.length });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.props.history.length > prevState.totalHistory.length);
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
          <i className="fas fa-arrow-circle-right navigationButton" disabled />
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
