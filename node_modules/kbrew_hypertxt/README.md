## kbrew_hypertxt -- version 1.0.6

Hypertxt is a lightweight HTML manipulator and generator written in JavaScript.

This package is meant to simplify web page generation to a single line, while managing dynamic data consistently.

- FontAwesome icon integration by default.
  (!) You need to require the FontAwesome cdn in order to see the icons. The library is not included by default so those who don't use FontAwesome don't have to include the library. Keep that in mind if you are having trouble.

### Before You Go Further...

In this reading we will explore:

- [x] Hypertxt's JavaScript Object Usage

## Installation

```
npm i kbrew_hypertxt
```

## Importing

```
import kbrew_hypertxt from "kbrew_hypertxt";

const $ = kbrew_hypertxt();

$.add("body", "Hello world!");
```

## Basics

Let's go through the different types of methods available:

```
PLEASE NOTE

properties => JS Object with common HTML DOM Attributes to be attached to the created element
  eg. {tag: 'img', src: '/img/example.png', class: 'myBeautifulExample'}
    = Tag within the properties object overwrites the default div tag. Any HTML DOM element type is accepted.
    ? Tags are unfiltered meaning use can be custom symantic elements eg. getElement({tag: 'ButtermilkPancakes'}) is completely valid
      expected output: <ButtermilkPancakes></ButtermilkPancakes>

METHODS

// Close an element with configurable tag type
// Used internally to close element tags
closeElement(properties)

// Filter undefined innerHTML
// Used internally to ensure pretty elements
processContent(string)

// Clears content of an element
clear(element | class:(.*)string | ID:(#*)string)

// Returns an element with configurable tag type and properties
getElement(properties)

// Returns an open ended element with configurable tag type and properties
getOpenElement(properties)

// Return a <br/>
ln()

// Return a <br/><br/>
dln()

// Get HTML document element
get(class:(.*)string | ID:(#*)string, index:integer)

// Adds incoming string to a target HTML document element
add(element | class:string | ID:string, whatToAdd:string | element)

// Removes a DOM element
remove(element | class:(.*)string | ID:(#*)string)

// Returns querySelector targeting the incoming string
query(class:(.*)string | ID:(#*)string)

// Returns querySelectorAll targeting the incoming string
queryAll(class:(.*)string | ID:(#*)string)

// (!) This package no longer includes FontAwesome by default. Their CDN is available here: [FontAwesome](https://fontawesome.com)
// Icon property "icon" is the selection of the icon you want. For example:
$.icon({
  icon: 'beer'
});
// Full list: [FontAwesome Icons](https://fontawesome.com/icons)

// Return a FontAwesome icon if Library is present in build
icon(properties)

// Return a FontAwesome icon of type 'far'
oIcon(properties)

// Return a FontAwesome icon of type 'fab'
bIcon(properties)

// Return a FontAwesome icon of type 'fal'
// (!) Must have FontAwesome Premium subscription
lIcon(properties)

// Find key value in JSON file
jsonParseGrab(required JSON File | raw JSON, key:string)
```

// Use Case \\

// In app.json

```
{
  "Version": "0.123761-b"
}
```

// In app.js using NodeJS require() syntax

```
console.log(jsonParseGrab(require('./app.json'), 'Version'));
// expected output: "0.123761-b"
```

// @END Use Case \\

## License

The package is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
