// Emails
'use strict';

const $ = require('kbrew_hypertxt'),
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
  <title id="title">Byte Wave Invoicing</title>
  <meta name="reply-to" content="info@bytewave-apps.com">
  <meta name="format-detection" content="telephone=no">
  <link rel="stylesheet" href="https://firebasestorage.googleapis.com/v0/b/bytewave-playground.appspot.com/o/bytewave%2Fraleway.css?alt=media&token=19ca76a7-f1c4-47e7-86ff-eec9457124a3" >
  <style type="text/css">
      html, body {
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
        width: 100vw;
        height: 100vh;
        font-family: 'Raleway', sans-serif;
        font-size: 16px;
        color: #444;
        overflow-x: hidden;
        text-align: left;
      }
      body {
        height: 100%;
      }
      .header {
        display: grid;
        align-items: center;
        justify-items: start;
        width: 100%;
        height: 50px;
        background-color: #777;
        box-sizing: border-box;
      }
      .date {
        display: inline-block;
        font-weight: light;
        font-size: 12px;
        opacity: 0.6;
      }
      .signiture {
        width: 170px;
        padding-bottom: 50px;
        height: 0;
        margin: 1em;
        outline: none;
        background: url('https://firebasestorage.googleapis.com/v0/b/bytewave-wy.appspot.com/o/bytewave%2Fbytewave-text-white.svg?alt=media&token=c2a28ebc-8377-4711-9f0c-477b52bba4b0');
        background-position: contain;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
      }
      .invoice {
        height: fit-content;
        width: fit-content;
        color: #f4f4f4;
        font-weight: bold;
        font-size: 18px;
        margin: 0 1em;
        padding: 1em;
        text-transform: uppercase;
        box-sizing: border-box;
        background-color: #368ca3;
       }
      .text {
        color: #777;
        padding-bottom: 1em;
        font-size: 16px;
        margin: 0 1em;
        line-height: 20px;
      }
      .link {
        outline: none;
        color: #777;
        cursor: pointer;
        text-decoration: underline;
      }
      .link:hover {
        color: #71ACBC;
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
  header = `<div class="header"><a href="https://bytewave-apps.com/" alt="Byte Wave" class="signiture"></a></div>`,
  htmlEnd = `</body></html>`;
(() => {
  class Emails {
    constructor() {
      this.timestamp = new Date();
    }

    invoice(user, invoice) {
      return htmlBegin + header + $.ln() + $.getElement({
        class: 'text',
        contains: `Hello ${user.first},<br><br>You have an invoice waiting.</br>`
      }) + $.getElement({
        class: 'invoice',
        contains: `<b>Invoice #</b>: ${invoice.id}`
      }) + $.getElement({
        class: 'text',
        contains: `<br>For: ${invoice.name}<br>Note: ${invoice.description}<br>Amount: $${invoice.amount} USD<br>Issued On: ${$.getElement({class:'date', contains:invoice.timestamp})}<br><br>Please visit your <a href="https://bytewave-apps.com/profile" target="new" alt="Profile" class="link">profile</a> to pay.<br><br>Thank you,<br>Byte Wave Sales Team<br>`
      }) + $.getElement({
        class: 'footer',
        contains: 'If you feel that this invoice was issued in error, please contact <a href="mailto:info@bytewave-apps.com" target="new" alt="Email Us" class="link">Byte Wave LLC</a>.'
      }) + htmlEnd;
    }

    custom(content, user) {
      return htmlBegin + header + $.ln() + $.getElement({
        class: 'text',
        contains: `Hello ${user.first},<br><br>${content}<br><br>Thank you,<br>Kaden Griffith<br>Byte Wave LLC<br>1 (307) 689-3456`
      }) + htmlEnd;
    }

    projectPending() {
      return htmlBegin + header + $.ln() + $.getElement({
        class: 'text',
        contains: `This is exciting!<br><br>Thank you for your project submission. A designer or engineer will review your project and contact you with an estimated schedule (if not previously discussed) for delivery.<br><br>Please follow all instructions posted in your subscription invoice to ensure your project will be activated and development can occur. <u>Not doing so may result in the deletion of your project or major delays in scheduling</u>. Upon payment, your project will be reviewed, assigned and activated. You will be then be contacted by your assigned representative. This representative will be the creator of your project and will provide you with support for all of our services.<br><br>Thank you,<br>Byte Wave Project Team`
      }) + $.getElement({
        class: 'footer',
        contains: 'If you wish to cancel your project, please contact support.'
      }) + htmlEnd;
    }

    projectApprove(email) {
      return htmlBegin + header + $.ln() + $.getElement({
        class: 'text',
        contains: `An account under <a href="https://bytewave-apps.com/admin"  class="link" target="new" alt="New project">${email}</a> just requested a project.<br><br>Thanks,<br>Byte Wave Project Team`
      }) + htmlEnd;
    }

    projectActivated(date) {
      return htmlBegin + header + $.ln() + $.getElement({
        class: 'text',
        contains: `Your project has been activated.<br><br>We're very excited to make something great with you! Thank you for your business.<br><br>Our proposed delivery date for your project is ${date}.<br><br>Let's make something great,<br>Byte Wave Project Team`
      }) + htmlEnd;
    }
  }
  module.exports = new Emails();
})();