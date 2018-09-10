import React, { Component, Fragment } from "react";
import firebase from "./firebase";
import Signout from "./SignOut";
import Signin from "./SignIn";
import image from "../media/blogo.jpg";

class Navbar extends Component {
  state = {
    loggedIn: false,
    userName: ""
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
    const { loggedIn } = this.state;
    const { toggleView } = this.props;
    return (
      <nav className="navbar navbar-light bg-light">
        {/* <button
          onClick={() => window.location.reload()}
          className="navbar-brand mb-0 h1"
        >
          Beerit
        </button>{" "} */}
        <img
          src={image}
          onClick={() => window.location.reload()}
          width="40"
          height="40"
          alt="logo"
        />
        {!this.state.loggedIn ? (
          <Fragment>
            <button
              type="button"
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#authModal"
              data-whatever="@mdo"
            >
              Login
            </button>
            <Signin />
          </Fragment>
        ) : (
          <Fragment>
            <button
              onClick={() => {
                toggleView(loggedIn);
              }}
              className="nav-link"
            >
              Favorites
            </button>
            <Signout />
          </Fragment>
        )}
      </nav>
    );
  }
}

export default Navbar;
