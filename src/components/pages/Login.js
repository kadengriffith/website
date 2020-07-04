import React, { Component } from "react";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Client from "../../objects/Client";

import "./Login.scss";

export default class Login extends Component {
  __isMounted = false;

  state = {
    email: "",
    password: ""
  };

  // Handle field change
  handleChange = input => e => {
    if (this.__isMounted) {
      this.setState({
        ...this.state,
        [input]: e.target.value
      });
    }
  };

  login = e => {
    e.preventDefault();

    const { displayMessage, history } = this.props,
      { email, password } = this.state;

    if (email.length > 0 && password.length > 0) {
      if (this.__isMounted) {
        this.setState({
          email: "",
          password: ""
        });
      }

      Client.auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          history.push("/upload");
        })
        .catch(() => {
          displayMessage(
            "e:Could not verify your login. Check your email and password and try again."
          );
        });
    }
  };

  componentDidMount() {
    this.__isMounted = true;

    const { history } = this.props;

    Client.auth.onAuthStateChanged(user => {
      if (user) {
        history.push("/upload");
      }
    });
  }

  componentWillUnmount() {
    this.__isMounted = false;
  }

  render() {
    return (
      <section>
        <form id="login" onSubmit={this.login}>
          <h2>Admin Login</h2>

          <FormControl>
            <TextField
              required
              id="email"
              label="Email"
              type="email"
              name="email"
              autoComplete="email"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange("email")}
              ref={input => {
                this.emailInput = input;
              }}
            />
            <TextField
              required
              label="Password"
              type="password"
              name="password"
              margin="normal"
              variant="outlined"
              autoComplete="current-password"
              onChange={this.handleChange("password")}
            />
            <Button onClick={this.login}>
              <i className="fad fa-user-lock" /> Log In
            </Button>
          </FormControl>
        </form>
        <br />
      </section>
    );
  }
}
