// author: Kaden Griffith
// descr : Generate HTML and create full index.html before packing

(() => {
  'use strict';

  // Dependencies
  const fs = require('fs'),
    path = require('path'),
    Pages = require('../objects/Pages'),
    C = require('../objects/Components'),
    _url = 'index.html';

  String.prototype.splice = (idx, rem, str) => {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
  };

  // Grabs index.html
  const _Index = (_file = path.join(__dirname, _url)) => {
    return new Promise(resolve => {
      resolve(fs.readFileSync(_file, 'utf8'));
    });
  };

  // Main entry point and operation
  async function generate_index() {
    const result = await _Index();
    rewriteIndex(result);
  }

  // Write the correct caching array to file before Firebase deploy
  function rewriteIndex(indexContent) {
    console.log(`A new index.html is being written...\n`);
    const root = Pages.index();

    /<div id="root">/.test(indexContent);

    const rightContext = RegExp.rightContext.toString(),
      leftContext = RegExp.leftContext.toString(),
      final = `${leftContext}${C.menu()}${C.navbar()}${C.messages()}<div id="root">${root}${rightContext}`;

    fs.unlinkSync(path.join(__dirname, _url));
    fs.writeFileSync(path.join(__dirname, _url), final);

    console.log(`...done\n`);
  }

  return generate_index().catch(err => console.error(err));
})();