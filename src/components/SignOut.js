import React, { Component } from "react";
import firebase from "./firebase";

class Signout extends Component {
  state = {
    email: "",
    password: "",
    user: "",
    loggedIn: true
  };

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({ user: "", email: "", password: "", loggedIn: false });
      });
  };

  render() {
    return (
      <a className="dropdown-item" onClick={this.logout}>
        Log Out
      </a>
    );
  }
}

export default Signout;
