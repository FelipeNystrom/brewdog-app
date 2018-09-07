import React, { Component } from "react";
import firebase from "./firebase";

class Signin extends Component {
  state = {
    email: "",
    password: "",
    user: "",
    needAuth: false,
    error: null
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  register = event => {
    event.preventDefault();
    this.setState({ needAuth: true });
  };

  login = event => {
    event.preventDefault();
    this.setState({ needAuth: false });
  };

  //sign up new user
  signUp = event => {
    event.preventDefault();
    const { email, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  //sign in existing user
  signIn = event => {
    event.preventDefault();
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.setState({ user });
      })
      .catch(error => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  //authentication
  auth = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user, needAuth: false });
      } else {
        this.setState({ user: "", needAuth: true });
      }
    });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="dropdown-menu dropdown-menu-right">
        <form className="px-4 py-3">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              value={email}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={this.handleInputChange}
            />
          </div>
          {!this.state.needAuth ? (
            <div>
              <button className="btn btn-primary" onClick={this.signIn}>
                Sign In
              </button>
              <div className="dropdown-divider"> </div>
              <a className="dropdown-item" onClick={this.register}>
                New around here? Sign up
              </a>
            </div>
          ) : (
            <div>
              <button className="btn btn-primary" onClick={this.signUp}>
                Sign Up
              </button>
              <div className="dropdown-divider"> </div>
              <a className="dropdown-item" onClick={this.login}>
                Already registered? Log in
              </a>
            </div>
          )}
        </form>
      </div>
    );
  }
}

export default Signin;
