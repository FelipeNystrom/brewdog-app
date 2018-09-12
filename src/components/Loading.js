import React, { Component } from 'react';
import './Loading.css';
import spinner from '../media/Spin-1s-200px.svg';

class Loading extends Component {
  render() {
    return (
      <div className="loadingWrapper">
        <img className="loadingSpinner" src={spinner} alt="" />
      </div>
    );
  }
}
export default Loading;
