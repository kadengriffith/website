import React, { Component } from "react";
import { kbrew_hypertxt } from "kbrew_hypertxt";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazy-load";
import { Button, TextField, FormControl } from "@material-ui/core";

import Client from "../../objects/Client";
import "./Index.scss";

const $ = new kbrew_hypertxt(),
  loadingImage = require("../../img/loading.gif");

export class Index extends Component {
  constructor() {
    super();

    Client.read("projects").then(photos => {
      let count = 1;

      photos.forEach(photo => {
        if (count < 4) {
          const data = photo.data();

          $.get("#gallery-" + count).src = data.url;
          $.get("#gallery-" + count).alt = data.filename;
          $.get("#gallery-" + count)["aria-label"] = data.filename;
        }

        count++;
      });
    });
  }

  state = {
    name: "",
    review: "",
    rating: 0
  };

  // Handle field change
  handleChange = input => e => {
    this.setState({
      [input]: e.target.value
    });
  };

  componentDidMount() {
    window.scrollTo(0, 0);

    $.queryAll(".star").forEach(el => {
      const parent = el.parentNode,
        i = Array.prototype.indexOf.call(parent.children, el);

      el.addEventListener("mouseover", () => {
        $.queryAll(".star").forEach((e, index) => {
          e.classList.remove("selected");

          if (index <= i) {
            e.classList.add("selected");
          }
        });
      });

      el.addEventListener("mouseout", () => {
        $.queryAll(".star").forEach(e => {
          e.classList.remove("selected");
        });
      });

      el.addEventListener("click", () => {
        $.queryAll(".star").forEach((e, index) => {
          e.classList.remove("selected");
          e.classList.remove("review-point");

          if (index <= i) {
            e.classList.add("selected");
            e.classList.add("review-point");
          }
        });
      });
    });
  }

  review = e => {
    e.preventDefault();

    let send = true;

    this.setState(
      {
        rating: $.queryAll(".review-point").length
      },
      () => {
        const { name, review, rating } = this.state;

        if (rating === 0) {
          this.props.displayMessage(
            "e:Please rate your experience 1 to 5 by clicking the stars."
          );

          send = false;
        }

        if (send) {
          Client.addToCollection("reviews", {
            client: name,
            review: review,
            rating: rating,
            timestamp: new Date()
          }).then(() => {
            this.props.displayMessage(
              "s:Your review has been submitted! Thank you for your valuable feedback."
            );

            $.queryAll(".review-point").forEach(el => {
              el.classList.remove("review-point");
            });

            this.setState({
              name: "",
              review: "",
              rating: 0
            });
          });
        }
      }
    );
  };

  render() {
    const { name, review } = this.state;

    return (
      <React.Fragment>
        <main>
          <section>
            <div className="grid">
              <header>
                <div className="tagline-container">
                  <div className="tagline">
                    Everything your landscaping company should be.
                  </div>
                </div>
              </header>
            </div>
            <div className="grid-2">
              <div className="contact-square">
                <div className="contact-picture" />
                <div className="contact-name">
                  <h3>Denton Wilson</h3>
                  <div className="contact-position">Founder</div>
                </div>
                <div className="contact-description">
                  Obsessed with success and the endless pursuit it requires, I
                  set out to start Wilson’s Residential Lawn Care. I planted my
                  money seed with a push mower and a weed eater out of the trunk
                  of a 1997 Buick Lasabre. Once you believe in yourself the
                  question becomes - what hurdle can you not overcome?
                </div>
                <Link
                  to="contact"
                  className="btn"
                  alt="Contact"
                  aria-label="Contact Denton"
                >
                  Contact
                </Link>
              </div>
              <div className="social-square">
                <h3>Follow Us</h3>
                <a
                  href="https://www.facebook.com/Wilsons-Residential-Lawn-Care-LLC-692498464255822/"
                  target="new"
                  alt="Facebook"
                  aria-label="Facebook"
                >
                  <i className="fab fa-facebook-f" />
                </a>
                <a
                  href="https://www.instagram.com/explore/locations/692498464255822/wilsons-residential-lawn-care-llc/"
                  target="new"
                  alt="Instagram"
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram" />
                </a>
              </div>
            </div>
          </section>
          <section>
            <div id="about">
              <h3>About Us</h3>
              <p>
                Wilson’s Residential Lawn Care is a full-service lawn mowing
                business. Through the industry knowledge that we have gathered,
                we provide professional services for residential and commercial
                clients alike. Our services include, but are not limited to:
                mowing, trimming, edging, and clearing hard surfaces of grass
                clippings.
              </p>
              <p>
                The problem we aim to solve is tall grass. But we don’t stop
                there. We are adding character while transforming our customer’s
                yard. Through dedication and many learned lessons, we offer the
                pinnacle of lawn service. Many others have found great success
                in strictly lawn care; however, we have chosen to branch out
                into different sectors of the industry while keeping our “grass
                roots” intact.
              </p>
              <p>
                We regret not starting our journey sooner! As our company grows,
                we will not become stagnant. New plans will constantly be formed
                based on the changes we encounter. A diversified and
                professional outlook drives our company to greater heights.
                Because of the energy and positivity that we bring as your lawn
                care provider, we offer more than a visual upgrade to your
                location. From a simple trim to a project overhaul, we will
                provide the services you need and leave your residence or
                business looking better than ever before.
              </p>
            </div>
          </section>
          <section>
            <div id="gallery-preview">
              <div id="preview-tile">
                <h3>Our Work</h3>
                <div id="gallery-images">
                  <LazyLoad debounce={false} offsetVertical={500}>
                    <div id="gallery-1-container" className="img-container">
                      <img
                        id="gallery-1"
                        src={loadingImage}
                        alt="Loading gallery preview 1"
                      />
                    </div>
                  </LazyLoad>
                  <LazyLoad debounce={false} offsetVertical={500}>
                    <div id="gallery-2-container" className="img-container">
                      <img
                        id="gallery-2"
                        src={loadingImage}
                        alt="Loading gallery preview 2"
                      />
                    </div>
                  </LazyLoad>
                  <LazyLoad debounce={false} offsetVertical={500}>
                    <div id="gallery-3-container" className="img-container">
                      <img
                        id="gallery-3"
                        src={loadingImage}
                        alt="Loading gallery preview 3"
                      />
                    </div>
                  </LazyLoad>
                </div>
                <Link
                  to="gallery"
                  alt="Project gallery"
                  aria-label="Project gallery"
                >
                  View All
                </Link>
              </div>
            </div>
          </section>
          <section>
            <div id="review">
              <form onSubmit={this.review}>
                <h3>How Are We Doing?</h3>
                <br />
                <FormControl className="form">
                  <TextField
                    aria-describedby="Enter your name."
                    label="Name"
                    variant="outlined"
                    autoComplete="cc-name"
                    onChange={this.handleChange("name")}
                    value={name}
                    required={true}
                  />
                  <br />
                  <TextField
                    multiline={true}
                    aria-describedby="Enter your review."
                    label="Review Message"
                    variant="outlined"
                    onChange={this.handleChange("review")}
                    value={review}
                    required={true}
                  />
                  <br />
                  <div className="grid-5" aria-label="Your rating">
                    <div className="star">
                      <i className="fas fa-star" />
                    </div>
                    <div className="star">
                      <i className="fas fa-star" />
                    </div>
                    <div className="star">
                      <i className="fas fa-star" />
                    </div>
                    <div className="star">
                      <i className="fas fa-star" />
                    </div>
                    <div className="star">
                      <i className="fas fa-star" />
                    </div>
                  </div>
                  <Button variant="contained" type="submit">
                    Submit Review
                  </Button>
                </FormControl>
              </form>
            </div>
          </section>
        </main>
      </React.Fragment>
    );
  }
}

export default Index;
