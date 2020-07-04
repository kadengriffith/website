import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom/";
import { kbrew_hypertxt } from "kbrew_hypertxt";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Theme from "./themes/Theme";
// Global components
import Footer from "./components/layout/Footer";
// App pages
import Index from "./components/pages/Index";
import Project from "./components/pages/Project";
import Login from "./components/pages/Login";
import Upload from "./components/pages/Upload";

// import Client from "./objects/Client";

import "./App.scss";

const $ = new kbrew_hypertxt();

let messageTimeout = null;

export class App extends Component {
  constructor() {
    super();

    this.state = {
      messages: []
    };

    setInterval(this.checkMessages, 200);
  }

  checkMessages = () => {
    const { messages } = this.state,
      msg = messages[0] ? messages[0].msg : null;

    if ($.get("#messages").innerHTML.length === 0 && msg) {
      $.get("#messages").innerHTML = msg.substring(2);

      $.get("#messages").style.backgroundColor =
        msg.charAt(0) === "e" ? "#ec644b" : "#26c281";

      $.get("#messages").style.backgroundColor =
        msg.charAt(0) === "w"
          ? "#eccc68"
          : $.get("#messages").style.backgroundColor;

      $.get("#messages").style.display = "block";

      $.get("#messages").addEventListener("click", () => {
        this.clearMessage();
        clearTimeout(messageTimeout);
      });

      messageTimeout = setTimeout(() => {
        if ($.get("#messages").style.display === "block") this.clearMessage();
      }, 6000);
    }
  };

  clearMessage = () => {
    const { messages } = this.state;

    this.setState({
      messages: messages.filter(m => {
        return m.msg !== messages[0].msg;
      })
    });

    $.clear("#messages");
    $.get("#messages").style.display = "none";
  };

  displayMessage = msg => {
    // Messages prefixed e: are errors, s: success, w: warning
    this.setState({
      messages: [...this.state.messages, { msg }]
    });
  };

  componentDidMount() {
    window.scrollTo(0, 0);

    if (!navigator.onLine) {
      this.displayMessage(
        `w:No network connection detected.<br>Please connect to the internet to access full functionality.`
      );
    }
  }

  render() {
    return (
      <ThemeProvider theme={Theme}>
        <Router>
          <div className="App">
            <Route
              exact
              path="/"
              render={props => (
                <Index {...props} displayMessage={this.displayMessage} />
              )}
            />
            <Route
              exact
              path="/login"
              render={props => (
                <Login {...props} displayMessage={this.displayMessage} />
              )}
            />
            <Route
              exact
              path="/upload"
              render={props => (
                <Upload {...props} displayMessage={this.displayMessage} />
              )}
            />
            <Route
              exact
              path="/project/:id"
              render={props => (
                <Project {...props} displayMessage={this.displayMessage} />
              )}
            />
            <Footer id="footer" />
          </div>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
