import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Prism from "prismjs";

import Client from "../../objects/Client";
import "./Project.scss";
import "../../prism.css";

const Link = require("react-router-dom").Link,
  moment = require("moment");

export class Project extends Component {
  __isMounted = false;

  state = {
    link: "",
    photoUrl: null,
    code: "",
    description: "",
    name: "",
    date: "",
    type: ""
  };

  componentDidMount() {
    window.scrollTo(0, 0);

    this.__isMounted = true;

    const { id } = this.props.match.params;

    Client.read("projects", id)
      .then(record => {
        const project = record.data();

        if (this.__isMounted) {
          this.setState(
            {
              link: project.link,
              photoUrl: project.photoUrl,
              code: project.code,
              description: project.description,
              name: project.name,
              date: moment(project.timestamp.toDate()).fromNow(),
              type: project.type
            },
            () => {
              Prism.highlightAll();
            }
          );
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  componentWillUnmount() {
    this.__isMounted = false;
  }

  render() {
    const { code, description, name, date, type, photoUrl, link } = this.state;

    return (
      <main>
        <section>
          <div id="project">
            <Link to="/" aria-label="Home" alt="Home">
              <Button variant="contained">Home</Button>
            </Link>
            <br />
            <br />
            <div
              id="project-photo"
              style={{ backgroundImage: `url("${photoUrl}")` }}
            ></div>
            <h1>{name}</h1>
            <h3>
              <span style={{ textTransform: "capitalize" }}>{type}</span>{" "}
              {link.length > 0 ? (
                <a href={link} target="new" aria-label="Project Link">
                  <i className="fad fa-link"></i>
                </a>
              ) : null}
              <br />
              {date}{" "}
            </h3>
            <p>{description}</p>
            {code.length < 20 ? null : <div id="demo"></div>}
            {code.length < 20 ? null : (
              <pre id="code">
                <code className={`language-${type}`}>{code}</code>
              </pre>
            )}
          </div>
        </section>
      </main>
    );
  }
}

export default Project;
