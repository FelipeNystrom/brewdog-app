import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import firebase from "./firebase";
import Signout from "./SignOut";
import Signin from "./SignIn";
import image from "../media/blogo.jpg";
import "./Card.css";

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
        console.log(user.uid + " LOGGED IN");
      } else {
        // User is signed out, user === null
        this.setState({ userName: "", loggedIn: false });
        console.log("NOT LOGGED IN");
      }
    });
  };

  render() {
    const { loggedIn } = this.state;
    return (
      <Fragment>
        <nav className="navbar sticky-top navbar-light bg-light">
          <Link to="/">
            <img src={image} width="40" height="40" alt="logo" />
          </Link>
          {!loggedIn ? (
            <Fragment>
              <button
                type="button"
                className="btn btn-outline-dark btn-sm"
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
                <button className="btn btn-outline-success btn-sm">
                  Favorites
                </button>
              </Link>
              <Signout />
            </Fragment>
          )}
        </nav>
        <Signin />
      </Fragment>
    );
  }
}

export default Navbar;
