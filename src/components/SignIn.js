import React, { Component } from 'react';
import firebase from './firebase';

class Signin extends Component {
  state = {
    email: '',
    password: '',
    user: '',
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
        this.setState({ user });
      } else {
        this.setState({ user: '' });
      }
    });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div
        className="modal fade"
        id="authModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="authModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="authModalLabel">
                Login/Register
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="login-tab"
                    data-toggle="tab"
                    href="#login"
                    role="tab"
                    aria-controls="login"
                    aria-selected="true"
                  >
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="register-tab"
                    data-toggle="tab"
                    href="#register"
                    role="tab"
                    aria-controls="register"
                    aria-selected="false"
                  >
                    Register
                  </a>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="login"
                  role="tabpanel"
                  aria-labelledby="login-tab"
                >
                  ...
                  <form>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={this.handleInputChange}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={this.signIn}
                      data-dismiss="modal"
                    >
                      Login
                    </button>
                  </form>
                </div>
                <div
                  className="tab-pane fade"
                  id="register"
                  role="tabpanel"
                  aria-labelledby="register-tab"
                >
                  ...
                  <form>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail2"
                        aria-describedby="emailHelp"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword2"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={this.signUp}
                      data-dismiss="modal"
                    >
                      Register
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;

// <div className="dropdown-menu dropdown-menu-right">
//         <form className="px-4 py-3">
//           <div className="form-group">
//             <label>Email</label>
//             <input
//               type="email"
//               className="form-control"
//               name="email"
//               placeholder="Email"
//               value={email}
//               onChange={this.handleInputChange}
//             />
//           </div>
//           <div className="form-group">
//             <label>Password</label>
//             <input
//               className="form-control"
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={password}
//               onChange={this.handleInputChange}
//             />
//           </div>
//           {!this.state.needAuth ? (
//             <div>
//               <button className="btn btn-primary" onClick={this.signIn}>
//                 Sign In
//               </button>
//               <div className="dropdown-divider"> </div>
//               <a className="dropdown-item" onClick={this.register}>
//                 New around here? Sign up
//               </a>
//             </div>
//           ) : (
//             <div>
//               <button className="btn btn-primary" onClick={this.signUp}>
//                 Sign Up
//               </button>
//               <div className="dropdown-divider"> </div>
//               <a className="dropdown-item" onClick={this.login}>
//                 Already registered? Log in
//               </a>
//             </div>
//           )}
//         </form>
//       </div>
