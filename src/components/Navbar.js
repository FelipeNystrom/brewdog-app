import React, { Component, Fragment } from 'react';
import firebase from './firebase';
import Signout from './SignOut';
import Signin from './SignIn';

class Navbar extends Component {
  state = {
    loggedIn: false,
    userName: ''
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
        console.log(user.uid + ' LOGGED IN');
      } else {
        // User is signed out, user === null
        this.setState({ userName: '', loggedIn: false });
        console.log('NOT LOGGED IN');
      }
    });
  };

  render() {
    const { loggedIn } = this.state;
    const { toggleView } = this.props;
    return (
      <Fragment>
        {!this.state.loggedIn ? (
          <nav className="navbar navbar-light bg-light">
            <span className="navbar-brand mb-0 h1">Beerit</span>
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-secondary dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Sign in
              </button>
              <Signin />
            </div>
          </nav>
        ) : (
          <nav className="navbar navbar-light bg-light">
            <span className="navbar-brand mb-0 h1">Beerit</span>
            <a
              onClick={() => {
                toggleView(loggedIn);
              }}
              className="nav-link"
            >
              Favorites
            </a>
            <Signout />
          </nav>
        )}
      </Fragment>
    );
  }
}

export default Navbar;
