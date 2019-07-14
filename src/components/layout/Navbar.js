import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.scss";

function Navbar() {
  return (
    <nav>
      <div id="navigation">
        <Link
          to="/"
          id="logo-tag"
          aria-label="Wilson's Lawn and Landscape"
          alt="Wilson's Lawn and Landscape"
        >
          <div className="logo" />
        </Link>
        <a
          href="tel:14175513864"
          className="btn"
          aria-label="Call Wilson's Lawn and Landscape"
          alt="Call Now"
        >
          Call Now
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
