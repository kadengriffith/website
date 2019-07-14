import React, { Component } from "react";
import MaskedInput from "react-text-mask";
import {
  Button,
  TextField,
  FormControl,
  OutlinedInput,
  InputLabel
} from "@material-ui/core";

import { Emails } from "../../objects/Emails";

const io = require("socket.io-client"),
  socket = io("https://message.wilsonlls.com"),
  E = new Emails();

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        "(",
        /\d/,
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ]}
      placeholderChar={"\u2000"}
      showMask
    />
  );
}

export class Contact extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "(   )    -    ",
    subject: "",
    message: ""
  };

  sendMessage = e => {
    e.preventDefault();

    const { message, subject } = this.state,
      mail = {
        message,
        subject,
        html: E.message(this.state)
      };

    socket.emit("message", mail);

    socket.on("message-sent", () => {
      window.scrollTo(0, 0);

      this.setState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "(   )    -    ",
        subject: "",
        message: ""
      });

      this.props.displayMessage("s:Your message was sent successfully.");
    });

    socket.on("message-failed", data => {
      window.scrollTo(0, 0);

      this.props.displayMessage(`e:${data.err}`);
    });
  };

  // Handle field change
  handleChange = input => e => {
    this.setState({
      [input]: e.target.value
    });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { firstName, lastName, email, phone, subject, message } = this.state;

    return (
      <React.Fragment>
        <br />
        <div className="grid">
          <h1>Contact</h1>
          <h5>
            Please fill out the following form with your contact information and
            message. Then click or tap the send button to email Wilson's Lawn
            and Landscape. Feel free to contact us for any reason.
          </h5>
          <form onSubmit={this.sendMessage}>
            <FormControl className="form">
              <TextField
                aria-describedby="Enter your first name."
                label="First Name"
                variant="outlined"
                autoComplete="given-name"
                onChange={this.handleChange("firstName")}
                value={firstName}
                required={true}
              />
              <br />
              <TextField
                aria-describedby="Enter your last name."
                label="Last Name"
                variant="outlined"
                autoComplete="family-name"
                onChange={this.handleChange("lastName")}
                value={lastName}
                required={true}
              />
              <br />
              <TextField
                aria-describedby="Enter your email."
                label="Email"
                type="email"
                autoComplete="email"
                variant="outlined"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}"
                onChange={this.handleChange("email")}
                value={email}
                required={true}
              />
              <br />
              <FormControl>
                <InputLabel htmlFor="formatted-text-mask-input">
                  Phone*
                </InputLabel>
                <br />
                <OutlinedInput
                  value={phone}
                  variant="outlined"
                  aria-describedby="Enter your phone number."
                  notched={true}
                  autoComplete="tel"
                  maxLength={12}
                  onChange={this.handleChange("phone")}
                  id="formatted-text-mask-input"
                  inputComponent={TextMaskCustom}
                  required={true}
                />
              </FormControl>
              <br />
              <TextField
                aria-describedby="Enter a message subject."
                label="Message Subject"
                variant="outlined"
                onChange={this.handleChange("subject")}
                value={subject}
                required={true}
              />
              <br />
              <TextField
                multiline={true}
                aria-describedby="Enter your message."
                label="Message"
                variant="outlined"
                onChange={this.handleChange("message")}
                value={message}
                required={true}
              />
              <br />
              <Button variant="contained" type="submit">
                Send{" "}
                <i
                  className="fal fa-paper-plane"
                  style={{ marginLeft: "0.5em" }}
                />
              </Button>
            </FormControl>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Contact;
