import React, { Component } from "react";
import { kbrew_hypertxt } from "kbrew_hypertxt";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Client from "../../objects/Client";

import "./Upload.scss";
import "../../objects/Quill.css";

const $ = new kbrew_hypertxt(),
  Link = require("react-router-dom").Link,
  Quill = require("quill");

export default class Upload extends Component {
  __isMounted = false;

  state = {
    link: "",
    name: "",
    type: "",
    description: "",
    imageUploaded: false
  };

  handleChange = input => e => {
    if (this.__isMounted) {
      this.setState({
        ...this.state,
        [input]: e.target.value
      });
    }
  };

  registerImageUpload = () => {
    if ($.get("#image")) {
      $.get("#image").addEventListener("change", () => {
        const file = $.get("#image").files[0],
          reader = new FileReader();

        reader.onloadend = () => {
          $.get("#image-upload-background").style.color = "transparent";
          $.get("#image-upload-background").style.background = "transparent";
          $.get(
            "#image-upload-background"
          ).style.backgroundImage = `url('${reader.result}')`;
          $.get("#image-upload-background").style.backgroundSize = "cover";
          $.get("#image-upload-background").style.backgroundRepeat =
            "no-repeat";
          $.get("#image-upload-background").style.backgroundPosition =
            "center center";

          if (this.__isMounted) {
            this.setState({
              imageUploaded: true
            });
          }
        };

        reader.onerror = err => {
          this.props.displayMessage(
            `e:Error: There was a problem when uploading your image.`
          );
        };

        reader.readAsDataURL(file);
      });
    }
  };

  componentDidMount() {
    const { history } = this.props;

    this.__isMounted = true;

    Client.auth.onAuthStateChanged(user => {
      if (user) {
        this.registerImageUpload();

        new Quill("#text-editor", {
          modules: {
            toolbar: [
              [
                {
                  size: ["small", false, "large", "huge"]
                }
              ],
              [
                {
                  align: []
                }
              ],
              ["bold", "italic", "underline", "strike"],
              [
                {
                  color: []
                },
                {
                  background: []
                }
              ],
              [
                {
                  list: "ordered"
                },
                {
                  list: "bullet"
                }
              ]
            ]
          },
          placeholder: "Include any code for the project...",
          theme: "snow"
        });
      } else {
        history.push("/login");
      }
    });
  }

  componentWillUnmount() {
    this.__isMounted = false;
  }

  reset = () => {
    const { displayMessage } = this.props;

    if (
      window.confirm(
        "Are you sure you want to reset?\nAll content will be lost."
      )
    ) {
      if (this.__isMounted) {
        this.setState(
          {
            link: "",
            name: "",
            type: "",
            description: "",
            imageUploaded: false
          },
          () => {
            $.get(".ql-editor").innerHTML = "";

            $.get("#image-upload-background").style.background = "transparent";

            displayMessage("s:Your upload form was reset.");
          }
        );
      }
    }
  };

  upload = e => {
    e.preventDefault();

    const { displayMessage, history } = this.props,
      { type, imageUploaded, name, description, link } = this.state;

    if (type.length === 0) {
      displayMessage("e:Please select a post type.");
    } else if (!imageUploaded) {
      displayMessage("e:Please upload a cover image and retry.");
    } else if (name.length === 0) {
      displayMessage("e:Please title your submission.");
    } else {
      const file = $.get("#image").files[0],
        code = $.get(".ql-editor").innerHTML;

      Client.uploadFile(
        `projects/${name.replace(" ", "-").toLowerCase()}-photo`,
        file
      )
        .then(photoUrl => {
          Client.addToCollection("projects", {
            link,
            name,
            type: type.toLowerCase(),
            photoUrl,
            code,
            description,
            timestamp: new Date()
          })
            .then(id => {
              history.push(`/project/${id}`);
            })
            .catch(err => {
              console.error(err);
              displayMessage("e:An error occured. Please try again.");
            });
        })
        .catch(err => {
          console.error(err);
          displayMessage("e:An error occured. Please try again.");
        });
    }
  };

  render() {
    const { name, type, description, link } = this.state;

    return (
      <section>
        <form onSubmit={this.upload} noValidate autoComplete="off">
          <h2>
            <Link to="/" aria-label="Home" alt="Home">
              <Button>Home</Button>
            </Link>{" "}
            | Project Upload
          </h2>

          <FormControl>
            <input
              id="image"
              name="image"
              className="offscreen"
              type="file"
              accept=".png, .jpg, .jpeg, .gif, .tif"
            />
            <label htmlFor="image" id="image-label">
              <div id="image-upload-background">
                <p id="image-upload-text">
                  <i className="fal fa-file-image" />
                  <br />
                  Click here to upload an image.
                </p>
              </div>
            </label>
            <input
              id="project-code"
              name="project-code"
              className="offscreen"
              type="file"
              accept=".js"
            />
            <label htmlFor="project-code" id="program-label">
              <p>
                <i className="fad fa-cloud-upload-alt"></i> Upload Program Code
              </p>
            </label>

            <br />
            <TextField
              required
              id="title"
              label="Project Title"
              variant="outlined"
              value={name}
              onChange={this.handleChange("name")}
            />
            <br />
            <TextField
              required
              id="type"
              label="Project Type"
              variant="outlined"
              value={type}
              onChange={this.handleChange("type")}
            />
            <br />
            <TextField
              id="link"
              label="Project Link"
              variant="outlined"
              value={link}
              onChange={this.handleChange("link")}
            />
            <br />
            <TextField
              required
              id="description"
              label="Project Description"
              variant="outlined"
              multiline={true}
              value={description}
              onChange={this.handleChange("description")}
            />
            <br />
            <div id="text-editor" />
            <br />
            <div className="grid-2">
              <Button onClick={this.reset}>Reset</Button>
              <Button variant="contained" onClick={this.upload}>
                <i className="fad fa-cloud-upload" /> Upload
              </Button>
            </div>
          </FormControl>
        </form>
        <br />
      </section>
    );
  }
}
