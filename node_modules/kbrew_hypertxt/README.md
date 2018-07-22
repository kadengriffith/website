## kbrew_hypertxt -- version 1.0.3

Hypertxt is an HTML generator written in JavaScript.

This package is meant to simplify web page generation to a single line, while managing dynamic data consistently.
* FontAwesome icon integration by default.

### Before You Go Further...

In this reading we will explore:
* [x] Node JS / Express Web Applications
* [x] Hypertxt's JavaScript Object Usage

## Installation

```
npm i kbrew_hypertxt
```

## Basics

Let's go through the different types of methods available:

```
PLEASE NOTE
properties => JS Object with common HTML DOM Attributes to be attached to the created element
  eg. {tag: 'img', src: '/img/example.png', class: 'myBeautifulExample'}
    = Tag within the properties object overwrites the default div tag. Any HTML DOM element type is accepted.
    ? Tags are unfiltered meaning use can be infinitely custom eg. {tag: 'ButtermilkPancakes'} is completely valid and would return <ButtermilkPancakes></ButtermilkPancakes> if placed inside the getElement() method. This could be useful for templating or advanced HTML manipulation.

e => Commonly used to replace the string and meaning of 'element' in this file

METHODS
// Write HTML document
getFile(properties)

// Write element with configurable tag type and properties
write(properties)

// Clears all internally written data
clear()

// Write an open ended element with configurable tag type and properties
writeOpenElement(properties)

// Returns an element with configurable tag type and properties
getElement(properties)


// Returns an open ended element with configurable tag type and properties
getOpenElement(properties)

// Close an element with configurable tag type
closeElement(properties)

// Return a line break
ln()

// Return a double line break
dln()

// Return a FontAwesome icon if Library is present in build
// This package no longer includes FontAwesome by default but their CDN is available on fontawesome.com.
icon(properties)

// Return a FontAwesome icon of type 'far'
oIcon(properties)

// Return a FontAwesome icon of type 'fab'
bIcon(properties)

// Filter undefined innerHTML
processContent(elementContent)

// Get HTML document element
get(e, index)

// Adds incoming string to a target HTML document element
add(ref, what = '')

// Removes
subtract(classOrID)

// Returns querySelector targeting the incoming string
query(target)

// Returns querySelectorAll targeting the incoming string
queryAll(target)

// Find key value in JSON file
jsonParseGrab(OBJ, key)
```

// Use Case     \\

// In app.json

```
{
  "Version": "0.123761-b"
}
```

// In app.js using Node require() syntax

```
console.log(jsonParseGrab(require('./app.json'), 'Version'));
// expected output: "0.123761-b"
```

// @END Use Case \\


## Creating HTML

Let's take a look at how hypertxt can be used to write a virtual file and send the content back to our client using Express web app structures.

In this example, we will create a Node / Express server application and use a simple get request to send the data hypertxt writes for us.

Create a new folder that will contain our example app.

```
cd path/to/where/you/want/to/work && sudo mkdir app && cd app/
npm init -y && npm i express kbrew_hypertxt && sudo touch app.js
sudo atom app.js
```

Now in app.js you can paste the following snippet

```
const express = require('express'),
  app = express(),
  $ = require('kbrew_hypertxt'),
  PORT = 8080;

let Index = $('Hello World'),
  IndexProperties = {
    head: Index.getOpenElement({
      tag: 'link',
      rel: 'stylesheet',
      href: 'some-cdn-or-local-file.css'
    }),
    body: Index.getElement({
      class: 'Foo 4',
      contains: Index.getElement({
        tag: 'p',
        contains: 'Bar'
      })
    })
  };

app.get('/', (req, res) => {
  res.send(Index.getFile(IndexProperties));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
```

Running

```
node app.js
```

and visiting localhost:8080 in a web browser, the results are the following...

```
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta content="ie=edge">
  <title>Hello World</title>
  <link rel="stylesheet" href="some-cdn-or-local-file.css">
</head>
<body>
  <div class="Foo 4">
    <p>Bar</p>
  </div>
</body>
</html>
```

## License

The package is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
