import React, { Component } from "react";

export class Terms extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <React.Fragment>
        <br />
        <div className="grid" id="terms">
          <h1>Terms of Use</h1>
          <p>
            <b>Effective: 1 March 2019</b>
          </p>
          <br />
          <p>
            These Terms of Use ("Terms") are a contract between you and Byte
            Wave, LLC ("Bytewave"). They govern your use of Bytewave’s sites,
            services, mobile apps, products, and content ("Services").
          </p>
          <p>
            By using Bytewave software, you agree to these Terms. If you don’t
            agree to any of the Terms, you can’t use this site or any entity or
            Service associated with Bytewave.
          </p>
          <p>
            We can change these Terms at any time. A record of all changes to
            our Terms are available for review on this site, listed below. If a
            change is material, we’ll let you know before they take effect. By
            using Bytewave software on or after the effective date, you agree to
            the new Terms. If you don’t agree to them, you should refrain from
            accessing this software before they take effect, otherwise your use
            of the site and content will be subject to the new Terms.
          </p>
          <p>
            Bytewave offers no rights to users for redistribution of content
            found on this site. All work found on this site is available for
            free.
          </p>
          <p>
            You’re responsible for the content you post (e.g. comments, reviews,
            messages). This means you assume all risks related to it, including
            someone else’s reliance on its accuracy, or claims relating to
            intellectual property or other legal rights.
          </p>
          <p>
            You’re welcome to post or a content on Bytewave software that you’ve
            published elsewhere, as long as you have the rights you need to do
            so. By posting content to this site, you represent that doing so
            doesn’t conflict with any other agreement you’ve made.
          </p>
          <p>We can remove or censor any content you post for any reason.</p>
          <p>
            We reserve all rights in this site’s look and feel. Some parts of
            Bytewave software are licensed under third-party open source
            licenses. As for other parts of this site, you may not copy or adapt
            any portion of our code or visual design elements (including logos,
            and graphics) without express written permission from Bytewave
            unless otherwise permitted by law.
          </p>
          <p>
            You may not do, or attempt to do, the following: (1) access or
            tamper with non-public areas of the Services, our computer systems,
            or the systems of our technical providers; (2) access or search the
            Services by any means other than the currently available, published
            interfaces (e.g. APIs) that we provide; (3) forge any TCP/IP packet
            header or any part of the header information in any email or
            posting, or in any way use the Services to send altered, deceptive,
            or false source-identifying information; or (4) interfere with, or
            disrupt, the access of any user, host, or network, including sending
            a virus, overloading, flooding, spamming, mail-bombing the Services,
            or by scripting the creation of content or accounts in such a manner
            as to interfere with or create an undue burden on the Services.
          </p>
          <p>
            Crawling the Services is allowed, but scraping or copying and
            distributing the Services content is prohibited.
          </p>
          <p>
            We may change, terminate, or restrict access to any aspect of
            Service, at any time, without notice.
          </p>
          <p>
            <i>
              Bytewave software is intended only for people 13 years old and
              over.
            </i>
          </p>
          <p>
            If you find a security vulnerability within this codebase, tell us
            via the{" "}
            <a
              href="mailto:info@bytewave-apps.com"
              alt="Byte Wave email"
              aria-label="Byte Wave email"
            >
              info@bytewave-apps.com
            </a>{" "}
            email address.
          </p>
          <p>
            By using the Services, you agree to let Bytewave collect and use
            information as detailed in our Privacy Policy. If you’re outside the
            United States, you consent to letting Bytewave transfer, store, and
            process your information (including your personal information and
            content) in and out of the United States.
          </p>
          <p>
            By using this site, you agree to follow these Rules and Policies. If
            you don’t, we may remove content, or suspend your access to the
            site.
          </p>
          <p>
            Bytewave provides the Services to you as is. You use them at your
            own risk and discretion. That means they don’t come with any
            warranty. None express, none implied. No implied warranty of
            merchantability, fitness for a particular purpose, availability,
            security, title or non-infringement.
          </p>
          <p>
            <b>Limitations of Liability:</b>
          </p>
          <p>
            If Bytewave doesn’t exercise a particular right under these Terms,
            that doesn’t waive it or allow you to assume your actions are
            acceptable. Any questions regarding use should be directed to{" "}
            <a
              href="mailto:info@bytewave-apps.com"
              alt="Byte Wave email"
              aria-label="Byte Wave email"
            >
              info@bytewave-apps.com
            </a>
            .
          </p>
          <p>
            If any provision of these terms is found invalid by a court of
            competent jurisdiction, you agree that the court should try to give
            effect to the parties’ intentions as reflected in the provision and
            that other provisions of the Terms will remain in full effect.
          </p>
          <p>
            <b>Choice of Law and Jurisdiction:</b>
          </p>
          <p>
            These Terms are governed by Wyoming state law, without reference to
            its conflict of laws provisions. You agree that any suit arising
            from the Services must take place in a court located in Cheyenne,
            Wyoming.
          </p>
          <p>
            These Terms (including any document incorporated by reference into
            them) are the whole agreement between Bytewave and you concerning
            the Services.
          </p>
          <h3>Questions?</h3>
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

export default Terms;
