import React from "react";
import { Link } from "react-router-dom";

import "./Footer.scss";

function Footer() {
  return (
    <footer id="footer">
      <div className="grid">
        <div className="grid-3">
          <div className="link-group">
            <h3>Social</h3>
            <a
              href="https://www.facebook.com/Wilsons-Residential-Lawn-Care-LLC-692498464255822/"
              target="new"
              alt="Facebook"
              aria-label="Facebook"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/explore/locations/692498464255822/wilsons-residential-lawn-care-llc/"
              target="new"
              alt="Instagram"
              aria-label="Instagram"
            >
              Instagram
            </a>
          </div>
          <div className="link-group">
            <h3>Company</h3>
            <Link to="contact" alt="Contact us" aria-label="Contact us">
              Contact Us
            </Link>
            <Link to="gallery" alt="Projects" aria-label="Projects">
              Gallery
            </Link>
          </div>
          <div className="link-group">
            <div className="footer-location">Ozark, Mo</div>
            <div className="footer-hours">Open 9am-5pm, M-F</div>
          </div>
        </div>
        <div className="grid-2">
          <Link to="terms" alt="Terms of use" aria-label="Terms of use">
            Terms
          </Link>
          <Link to="privacy" alt="Privacy policy" aria-label="Privacy policy">
            Privacy
          </Link>
        </div>
        <a
          href="https://bytewave-apps.com"
          target="new"
          alt="Byte Wave LLC"
          aria-label="Byte Wave LLC"
        >
          <div id="bytewave" />
        </a>
        <div id="copyright">
          © 2019, Wilson’s Residential Lawn Care, LLC. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
