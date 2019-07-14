import { kbrew_hypertxt } from "kbrew_hypertxt";

const $ = new kbrew_hypertxt(),
  htmlBegin = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>
<!--[if gte mso 9]><xml>
<o:OfficeDocumentSettings>
<o:AllowPNG/>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml><![endif]-->
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover, minimal-ui">
  <title id="title">A client has something to say!</title>
  <meta name="reply-to" content="wresidentiallawncare@yahoo.com">
  <meta name="format-detection" content="telephone=no">
  <link href="https://fonts.googleapis.com/css?family=Playfair+Display" rel="stylesheet">
  <style type="text/css">
      html, body {
        background-color: #fff;
        margin: 0;
        width: 100vw;
        height: fit-content;
        font-family: 'Playfair Display', serif;
        font-size: 16px;
        color: #444;
        overflow-x: hidden;
        text-align: left;
      }
      body {
        height: 100%;
      }
      .text {
        padding-bottom: 1em;
        margin: 0 2em;
        line-height: 20px;
      }
      .link {
        outline: none;
        color: #43a047;
        cursor: pointer;
      }
      .link:hover {
        text-decoration: none;
      }
      .footer {
        width: calc(100% - 2em);
        text-align: center;
        font-weight: light;
        margin: 2em 1em;
        color: #777;
        opacity: 0.6;
        font-size: 12px;
      }
    </style>
  </head>
  <body>`,
  htmlEnd = `</body></html>`;

export class Emails {
  constructor() {
    this.timestamp = new Date();
  }

  message(message) {
    return (
      htmlBegin +
      $.ln() +
      $.getElement({
        class: "text",
        contains: `<b>SENDER NAME:</b> ${message.firstName} ${message.lastName}`
      }) +
      $.getElement({
        class: "text",
        contains:
          `<b>SENDER EMAIL:</b> ` +
          $.getElement({
            tag: "a",
            href: `mailto:${message.email}`,
            class: "link",
            contains: message.email
          })
      }) +
      $.getElement({
        class: "text",
        contains:
          `<b>SENDER PHONE:</b> ` +
          $.getElement({
            tag: "a",
            href: `tel:${message.phone}`,
            class: "link",
            contains: message.phone
          })
      }) +
      $.getElement({
        class: "text",
        contains: `<b>MESSAGE SUBJECT:</b> ${message.subject}`
      }) +
      $.getElement({
        class: "text",
        contains: `<b>MESSAGE:</b>`
      }) +
      $.getElement({
        class: "text",
        contains: message.message.replace(/\n/g, "<br>")
      }) +
      htmlEnd
    );
  }
}

export default Emails;
