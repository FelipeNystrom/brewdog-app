import React, { Component } from "react";
import firebase from "./firebase";

class Signup extends Component {
  state = {
    email: "",
    password: "",
    user: "",
    error: null
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
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

  //authentication
  auth = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: "" });
      }
    });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.signUp}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.handleInputChange}
          />
          <button>Register</button>
        </form>
      </div>
    );
  }
}

export default Signup;
