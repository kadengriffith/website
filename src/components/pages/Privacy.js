import React, { Component } from "react";

export class Privacy extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <React.Fragment>
        <br />
        <div className="grid">
          <h1>Privacy Policy</h1>
          <p>
            <b>Effective: 1 March 2019</b>
          </p>
          <br />
          <h4>How does this site collect data about me?</h4>
          <p>Byte Wave, LLC ("Bytewave") collects data about you:</p>
          <ul>
            <li>when you submit e-mail addresses for newsletter sign-ups</li>
            <li>
              when you contact Bytewave by e-mail for support or other help
            </li>
          </ul>
          <p>
            Bytewave does not buy or otherwise receive data about you from data
            brokers.
          </p>
          <h4>What data does Bytewave collect about me, and why?</h4>
          <p>
            Bytewave software collects data about visits to its web
            interface(s).
          </p>
          <p>Bytewave uses data about how you use this website to:</p>
          <ul>
            <li>optimize the website, so it's quick and easy to use</li>
            <li>diagnose and debug technical errors</li>
            <li>defend the website from abuse and technical attacks</li>
            <li>
              compile statistics on the kinds of software and computers visitors
              use
            </li>
          </ul>
          <p>
            <i>
              Bytewave does not make any of this data public and will not sell
              or allow access to any of the information collected, unless
              instructed by Law.
            </i>
          </p>
          <p>
            Some services allow for customer communication. If you are required
            to submit a valid email to participate in any service, Bytewave does
            not look at or solicit to that email unless explicitly permissed by
            the email owner or asked by law enforcement.
          </p>
          <p>Bytewave uses your e-mail address to:</p>
          <ul>
            <li>
              announce new versions of Terms or Policies, software, and services
            </li>
            <li>
              reset your password and help keep your account secure in the case
              that accounts are necessary for use
            </li>
            <li>
              contact you in special circumstances related to your account
            </li>
            <li>contact you about legal requests</li>
          </ul>
          <p>
            Bytewave keeps your e-mail address until notified by you to remove
            it from our systems. You may opt-out of any email subscription via
            an "unsubscribe" link within our emails. Your email will be removed
            from the mailing list but may still persist.
          </p>
          <h4>How can I make choices about data collection?</h4>
          <p>
            You're free to visit any Bytewave entity or site of Service without
            logging in. You may also configure your web browser to disable
            cookies when visiting Bytewave websites, however this may limit your
            ability to interact with the software as intended.
          </p>
          <p>You can opt out of Google Analytics using a browser extension.</p>
          <h4>Where does Bytewave store data about me?</h4>
          <p>All of bytewave servers are based in the United States.</p>
          <p>
            You can cancel your Bytewave software subscription or newsletter
            connection at any time. Your created account data will be disposed
            of, which could take a few days.
          </p>
          <p>
            In the case of anonomous posting, your created data will not be
            deleted since we have no way to tie content to its owner by design.
          </p>
          <h4>Does Bytewave share data about me with others?</h4>
          <p>
            Bytewave does not sell or give information about you to other
            companies or services. However, Bytewave does use services from
            other companies to provide some services, content delivery networks,
            and to distribute software. The companies behind those services may
            collect data about you on their own, for their own purposes. Some of
            these services may be used to collect information about your online
            activities across different websites. All of these services are
            based in the United States.
          </p>
          <h3>Still have questions?</h3>
          <p>
            Let us know at{" "}
            <a
              href="mailto:info@bytewave-apps.com"
              alt="Byte Wave email"
              aria-label="Byte Wave email"
            >
              info@bytewave-apps.com
            </a>
            !
          </p>
        </div>
      </React.Fragment>
    );
  }
}

export default Privacy;
