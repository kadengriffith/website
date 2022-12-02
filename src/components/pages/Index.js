import React, { Component } from "react";

import Client from "../../objects/Client";
import "./Index.scss";

const Link = require("react-router-dom").Link,
  moment = require("moment");

export class Index extends Component {
  __isMounted = false;

  state = {
    projects: [],
  };

  componentDidMount() {
    this.__isMounted = true;
    window.scrollTo(0, 0);

    Client.getCollection("projects", "desc").then((projects) => {
      if (this.__isMounted) {
        this.setState({
          projects,
        });
      }
    });
  }

  componentWillUnmount() {
    this.__isMounted = false;
  }

  getProjectType(type) {
    const t = type.toLowerCase();

    if (t === "javascript") {
      return <i className="fab fa-js"></i>;
    } else if (t === "python") {
      return <i className="fab fa-python"></i>;
    } else if (t === "react") {
      return <i className="fab fa-react"></i>;
    } else if (t === "angular") {
      return <i className="fab fa-angular"></i>;
    }
  }

  render() {
    const { projects } = this.state,
      projectList = projects.map((p, index) => (
        <Link
          to={`/project/${p.id}`}
          aria-label={p.name}
          alt={p.name}
          key={index}
          className="work"
        >
          <div
            className="work-img"
            style={{ backgroundImage: `url("${p.photoUrl}")` }}
          ></div>
          <p className="work-title">{p.name}</p>
          <p className="work-date">{moment(p.timestamp.toDate()).fromNow()}</p>
          <div className="badge">{this.getProjectType(p.type)}</div>
        </Link>
      ));

    return (
      <main>
        <section>
          <div id="background">
            <div id="filter" className="bg-pan-right"></div>
            <div id="name" className="focus-in-expand"></div>
          </div>
        </section>
        <section>
          <h4 id="about-start" className="text-shadow-pop-tl">
            What is this?
          </h4>
          <div id="about">
            <p>
              This is home to my public software projects. Most projects I work
              on in my free time will be located here. I am a software developer
              both professionally and personally. I also make music for a nice
              break from studying. If you enjoy the content please use any code
              shown for your own personal creations! Take a look at my social
              accounts or shoot me an email to see what I'm up to today.
            </p>
            <div>
              <div id="school1"></div>
              <div id="school2"></div>
            </div>
          </div>
        </section>
        <section>
          <h4 id="work-start">Work</h4>
          <div id="work-container">
            <div id="works">{projectList}</div>
          </div>
        </section>
      </main>
    );
  }
}

export default Index;
