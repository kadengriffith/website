import React, { Component } from "react";
import { kbrew_hypertxt } from "kbrew_hypertxt";
import LazyLoad from "react-lazy-load";
import Client from "../../objects/Client";

import "./Gallery.scss";

const $ = new kbrew_hypertxt();

export class Gallery extends Component {
  state = {
    images: []
  };

  renderImage = (url, label, key) => {
    return (
      <div key={key} className="img-container" onClick={this.expand}>
        <LazyLoad debounce={false} offsetVertical={900}>
          <img src={url} alt={label} aria-label={label} />
        </LazyLoad>
      </div>
    );
  };

  componentDidMount() {
    window.scrollTo(0, 0);

    Client.read("projects").then(photos => {
      photos.forEach(photo => {
        const data = photo.data();

        this.setState({
          images: [
            ...this.state.images,
            {
              img: data.url,
              file: data.filename,
              key: this.state.images.length + 1
            }
          ]
        });

        $.queryAll(".img-container").forEach(el => {
          el.addEventListener("click", () => {
            $.get(".expanded").classList.remove("expanded");

            el.classList.add("expanded");

            setTimeout(() => {
              el.scrollIntoView({
                behavior: "smooth",
                block: "center"
              });
            }, 100);
          });
        });

        $.get(".img-container", 0).classList.add("expanded");

        $.remove("#loading-images");
      });
    });
  }

  render() {
    const { images } = this.state;
    return (
      <React.Fragment>
        <br />
        <div className="grid">
          <h1>Our Work</h1>{" "}
          <div id="gallery">
            <div id="loading-images">Loading...</div>
            {images.map(img => this.renderImage(img.img, img.label, img.key))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Gallery;
