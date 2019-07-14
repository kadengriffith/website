// author      : Kaden Griffith
// filename    : index.js

// Dependencies
require('dotenv').config();

const express = require('express'),
  app = express(),
  http = require('http'),
  nodemailer = require('nodemailer'),
  fs = require('fs'),
  path = require('path'),
  helmet = require('helmet'),
  // Current server version from package.json
  build = jsonParser(require('./package'), 'version'),
  // Target port matching Nginx configuration
  port = 3005;

app.use(helmet());
app.set('port', port);

// Socket.io reciever
app.io = require('socket.io')({
  transports: ['websocket']
});

// Socket.io host
const server = http.createServer(app);

// create reusable transporter object using the default SMTP transport
// login using Gmail
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.email,
    pass: process.env.pass
  }
});

// Server-side conversation
app.io.on('connection', socket => {
  console.log('Client Connected.');

  socket.on('message', data => {
    transporter.sendMail({
      from: `Message Courier <${process.env.email}>`,
      to: process.env.denton,
      subject: `📬 A client has something to say! | ${data.subject}`,
      text: data.message,
      html: data.html
    }, (err, info) => {
      if (err) {
        socket.emit('message-failed', {
          err: "Server could not send your message. Please try again later."
        });

        console.error(err);
      } else {
        socket.emit('message-sent');
      }

      return err ? false : console.log(`Message sent: ${info.messageId}`);
    });
  });
});

// Duplicate server watching for requests and sending them to Nginx
server.listen(port, () => console.log(`Server running on port ${port}. +‿-`));

// Socket.io hook
app.io.listen(server);

// Find key value in JSON file
function jsonParser(OBJ, key) {
  return JSON.parse(JSON.stringify(OBJ))[key];
}