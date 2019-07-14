import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom/";
import { kbrew_hypertxt } from "kbrew_hypertxt";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Theme from "./themes/Theme";
// Global components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
// App pages
import Index from "./components/pages/Index";
import Gallery from "./components/pages/Gallery";
import Contact from "./components/pages/Contact";
import Terms from "./components/pages/Terms";
import Privacy from "./components/pages/Privacy";

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
    if ($.get("#loading").style.display !== "none") {
      $.get("#loading").style.setProperty("display", "none");
    }

    return (
      <ThemeProvider theme={Theme}>
        <Router>
          <div className="App">
            <Navbar />
            <Route
              exact
              path="/"
              render={props => (
                <Index {...props} displayMessage={this.displayMessage} />
              )}
            />
            <Route exact path="/gallery" component={Gallery} />
            <Route
              exact
              path="/contact"
              render={props => (
                <Contact {...props} displayMessage={this.displayMessage} />
              )}
            />
            <Route exact path="/terms" component={Terms} />
            <Route exact path="/privacy" component={Privacy} />

            <Footer id="footer" />
          </div>
        </Router>
      </ThemeProvider>
    );
  }
}

export default App;
