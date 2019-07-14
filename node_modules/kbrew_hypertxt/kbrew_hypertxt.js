// author   : Kaden Griffith
// filename : kbrew_hypertxt.js
// version  : 1.0.6

export class kbrew_hypertxt {
  // Hypertxt constructor
  constructor() {
    this.version = "1.0.6";
  }

  /*
   *  -- Prototype methods
   */

  // Returns an element with configurable tag type and properties
  getElement(properties) {
    let str_element = properties.tag ? `<${properties.tag}` : "<div";

    for (let property in properties) {
      if (!/(tag|contains|icon)/.test(property))
        str_element += ` ${property}="${properties[property]}"`;
    }

    str_element += `>${this.processContent(properties.contains)}`;

    str_element += properties.tag
      ? this.closeElement(properties)
      : this.closeElement({
          tag: "div"
        });

    return str_element;
  }

  // Returns an open ended element with configurable tag type and properties
  getOpenElement(properties) {
    let str_element = `<${properties.tag}`;

    for (let property in properties) {
      if (!/(tag|contains|icon)/.test(property))
        str_element += ` ${property}="${properties[property]}"`;
    }

    str_element += ">";

    return str_element;
  }

  // Close an element with configurable tag type
  closeElement(properties) {
    return `</${properties.tag}>`;
  }

  // Return a line break
  ln() {
    return this.getOpenElement({
      tag: "br"
    });
  }

  // Return a double line break
  dln() {
    return this.ln().repeat(2);
  }

  // Return a FontAwesome icon if Library is present in build
  icon(properties) {
    properties.tag = "i";
    properties.class = this.removeLeadingWhitespace(
      `${this.processContent(properties.class)} fas fa-${properties.icon}`
    );
    return this.getElement(properties);
  }

  // Return a FontAwesome icon of type 'far'
  oIcon(properties) {
    properties.tag = "i";
    properties.class = this.removeLeadingWhitespace(
      `${this.processContent(properties.class)} far fa-${properties.icon}`
    );
    return this.getElement(properties);
  }

  // Return a FontAwesome icon of type 'fab'
  bIcon(properties) {
    properties.tag = "i";
    properties.class = this.removeLeadingWhitespace(
      `${this.processContent(properties.class)} fab fa-${properties.icon}`
    );

    return this.getElement(properties);
  }

  // Return a FontAwesome icon of type 'fal'
  // FontAwesome Premium must be active on the site
  lIcon(properties) {
    properties.tag = "i";
    properties.class = this.removeLeadingWhitespace(
      `${this.processContent(properties.class)} fal fa-${properties.icon}`
    );

    return this.getElement(properties);
  }

  removeLeadingWhitespace(what) {
    return what.replace(/^\s+/, "");
  }

  // Filter undefined innerHTML
  processContent(elementContent) {
    return elementContent ? elementContent : "";
  }

  // Get HTML document element
  get(e, index) {
    if (!e) return this.query("body");

    if (e.includes("#")) {
      return document.getElementById(e.replace(/#/, ""));
    } else if (e.includes(".")) {
      return index
        ? document.getElementsByClassName(e.replace(/./, ""))[index]
        : document.getElementsByClassName(e.replace(/./, ""))[0];
    }
  }

  // Adds incoming string to a target HTML document element
  add(ref, what = "") {
    if (typeof ref === "string") {
      this.get(ref).innerHTML += what;
    } else {
      ref.innerHTML += what;
    }
  }

  // Removes an element
  remove(classOrID, index) {
    if (index) {
      return this.get(classOrID, index)
        ? this.get(classOrID, index).remove()
        : false;
    } else {
      return this.get(classOrID) ? this.get(classOrID).remove() : false;
    }
  }

  // Returns querySelector targeting the incoming string
  query(target) {
    return document.querySelector(target);
  }

  // Returns querySelectorAll targeting the incoming string
  queryAll(target) {
    return document.querySelectorAll(target);
  }

  // Find key value in JSON file
  jsonParseGrab(OBJ, key) {
    return JSON.parse(JSON.stringify(OBJ))[key];
  }

  // Clears all content in an element
  clear(e) {
    if (e) {
      if (typeof e === "string") {
        const element = this.get(e);

        if (element) {
          element.innerHTML = "";
        }
      } else {
        e.innerHTML = "";
      }
    }
  }
}

export default kbrew_hypertxt;
