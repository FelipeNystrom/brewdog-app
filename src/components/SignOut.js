import React, { Component } from 'react';
import firebase from './firebase';

class Signout extends Component {
  state = {
    email: '',
    password: '',
    user: '',
    loggedIn: true
  };

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({ user: '', email: '', password: '', loggedIn: false });
      });
  };

  render() {
    return (
      <button
        onClick={this.logout}
        type="button"
        className="btn btn-secondary"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Logout
      </button>
    );
  }
}

export default Signout;
