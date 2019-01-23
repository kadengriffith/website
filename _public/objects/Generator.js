const path = require('path'),
  fs = require('fs');

'use strict';

module.exports = class Generator {
  constructor(t, r) {
    this.templatePath = t;
    this.Template = (File = path.join(__dirname, `../${this.templatePath}`)) => {
      return new Promise(resolve => {
        resolve(fs.readFileSync(File, 'utf8'));
      });
    };
    this.route = r;
  }

  build(c) {
    console.log(`${this.route} is being written...\n`);
    this.content = c;

    return this.generate().then(() => {
      console.log(`...done\n`);
    }).catch(err => console.error(err));
  }

  // Main entry point and operation
  async generate() {
    const result = await this.Template();
    this.rewrite(result);
  }

  rewrite(template) {
    /{{{body}}}/.test(template);

    const rightContext = RegExp.rightContext.toString(),
      leftContext = RegExp.leftContext.toString(),
      final = `${leftContext}${this.content}${rightContext}`;

    fs.writeFileSync(path.join(__dirname, `../routes/html/${this.route}.html`), final);
  }
}