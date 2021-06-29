import React from "react";
import { Link } from "react-router-dom";

import "./Footer.scss";

function Footer() {
  return (
    <footer id="footer">
      <div className="grid">
        <div className="grid-2">
          <div className="link-group-wrapper">
            <h3>Social</h3>
            <div className="link-group">
              <a
                href="https://twitter.com/griffith_kaden"
                target="new"
                alt="Twitter"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://www.facebook.com/griffith.kaden"
                target="new"
                alt="Facebook"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://www.instagram.com/kadengriffith/?hl=en"
                target="new"
                alt="Instagram"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/kadengriffith/"
                target="new"
                alt="Linked In"
                aria-label="Linked In"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="https://github.com/kadengriffith"
                target="new"
                alt="GitHub"
                aria-label="GitHub"
              >
                <i className="fab fa-github-alt"></i>
              </a>
            </div>
          </div>
          <div className="address-group">
            <div className="footer-location">Colorado Springs, CO</div>
            <div className="footer-email">kadengriffith@gmail.com</div>
          </div>
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
          © 2021, Kaden Griffith{" "}
          <Link id="login" alt="Login" aria-label="Login" to="/login">
            <i className="fal fa-user-lock"></i>
          </Link>
          . All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
