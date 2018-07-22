// author: Kaden Griffith
// descr : Move code to app.js

(() => {
  'use strict';

  // Dependencies
  const fs = require('fs'),
    path = require('path'),
    _acc = [],
    _url = '_public',
    Parent = './app-fill.js';

  // Grabs paths to all files in given path
  const _Projects = (_path = path.join(__dirname, '../../', _url)) => {
    return new Promise(resolve => {
      fs.readdirSync(_path).forEach(file => {
        const PATH = _path + '/' + file;
        if(/p\d\.kaden\.*/gi.test(file)) {
          _acc.unshift(file);
        }
      });
      resolve();
    });
  };

  // Main entry point and operation
  async function get_Projects() {
    const result = await _Projects();
    rewriteApp();
  }

  // Write the correct caching array to file before Firebase deploy
  function rewriteApp(files = _acc) {
    for(let file of files) {
      const _content = fs.readFileSync(path.join(__dirname, '../../', _url, file), "utf8", (err, data) => err ? console.error(err) : data.toString()),
        app = fs.readFileSync(path.join(__dirname, '../../', _url, Parent), "utf8", (err, data) => err ? console.error(err) : data.toString()),
        _replace = file.toUpperCase(),
        _app = app.replace(_replace, _content.replace(/(['"`]+|\$|\}|\{)/g, ''));
      fs.writeFileSync(path.join(__dirname, '../../', _url, Parent), _app);
      console.log(`Added ${file} to the ${Parent} file.\n`);
    }
  }

  return get_Projects();
})();