import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import firebase from "./firebase";
import Signout from "./SignOut";
import Signin from "./SignIn";
import image from "../media/logo-ex-2.png";
import "./Navbar.css";

class Navbar extends Component {
  state = {
    loggedIn: false,
    userName: ""
  };

  mounted = true;
  // Runs a login-check on mount
  componentDidMount() {
    if (this.mounted) {
      this.auth();
    }
  }

  // Function for login-check
  auth = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        this.setState({ userName: user.uid, loggedIn: true });
      } else {
        // User is signed out, user === null
        this.setState({ userName: "", loggedIn: false });
      }
    });
  };

  render() {
    const { loggedIn } = this.state;
    return (
      <Fragment>
        <nav className="navbar sticky-top navbar-light bg-light">
          <div className="navbar-brand">
            <Link to="/">
              <img src={image} width="55" height="55" alt="logo" />
            </Link>
          </div>
          <div className="nav-bar-buttons">
            {!loggedIn ? (
              <Fragment>
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  data-toggle="modal"
                  data-target="#authModal"
                  data-whatever="@mdo"
                >
                  Login
                </button>
              </Fragment>
            ) : (
              <Fragment>
                <Link to="/favorites">
                  <button className="btn btn-outline-success">Favorites</button>
                </Link>

                <Signout />
              </Fragment>
            )}
          </div>
        </nav>
        <Signin />
      </Fragment>
    );
  }
}

export default Navbar;
