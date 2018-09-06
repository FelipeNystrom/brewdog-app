import React, { Component } from "react";
import firebase from "./firebase";
import Signout from "./SignOut";
import Signin from "./SignIn";

class Navbar extends Component {
  state = {
    loggedIn: false
  };

  // Runs a login-check on mount
  componentDidMount() {
    this.auth();
  }

  // Function for login-check
  auth = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        this.setState({ userName: user.uid, loggedIn: true });
        console.log(user.uid + " LOGGED IN");
      } else {
        // User is signed out, user === null
        this.setState({ userName: "", loggedIn: false });
        console.log("NOT LOGGED IN");
      }
    });
  };

  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <h2 className="navbar-brand">Beerit</h2>

        <div className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            id="navbarDropdownMenuLink"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Menu
          </a>
          <div
            className="dropdown-menu"
            aria-labelledby="navbarDropdownMenuLink"
          >
            {this.state.loggedIn ? <Signout /> : <Signin />}

            <a className="dropdown-item">
              {this.state.loggedIn ? "Favorites" : ""}
            </a>
            <a className="dropdown-item">About us</a>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
