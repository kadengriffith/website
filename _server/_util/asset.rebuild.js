// author: Kaden Griffith
// descr : Quickly identifies assets needed for PWA caching

(() => {
  'use strict';

  // Dependencies
  const fs = require('fs'),
    path = require('path'),
    $ = require('kbrew_hypertxt'),
    _acc = [],
    _url = $.jsonParseGrab(require('../../package'), 'kbrew-assets-url');

  // Grabs paths to all files in given path or default $assets
  const _Assets = (_path = path.join(__dirname, '../../', _url)) => {
    return new Promise(resolve => {
      fs.readdirSync(_path).forEach(file => {
        const PATH = _path + '/' + file;
        console.log('...' + PATH.substring(PATH.length - 50, PATH.length));
        if(fs.lstatSync(PATH).isDirectory()) {
          console.log(`=>  Found a Directory | ...${PATH.substring(PATH.length - 26, PATH.length)}`);
          _Assets(PATH);
        } else {
          if(/\.html$/i.test(file)) {
            if(/install/.test(PATH)) {
              _acc.unshift(`'/install/${file}'`);
            } else if(/browse/.test(PATH)) {
              _acc.unshift(`'/browse/${file}'`);
            } else if(/pricing/.test(PATH)) {
              _acc.unshift(`'/pricing/${file}'`);
            } else if(/shop/.test(PATH)) {
              _acc.unshift(`'/shop/${file}'`);
            } else if(/login/.test(PATH)) {
              _acc.unshift(`'/login/${file}'`);
            } else if(/privacy/.test(PATH)) {
              _acc.unshift(`'/privacy/${file}'`);
            } else if(/profile/.test(PATH)) {
              _acc.unshift(`'/profile/${file}'`);
            } else if(/project/.test(PATH) && !/add/.test(PATH)) {
              _acc.unshift(`'/project/${file}'`);
            } else if(/project/.test(PATH) && /add/.test(PATH)) {
              _acc.unshift(`'/project/add/${file}'`);
            } else if(/signup/.test(PATH)) {
              _acc.unshift(`'/signup/${file}'`);
            } else if(/terms/.test(PATH)) {
              _acc.unshift(`'/terms/${file}'`);
            } else {
              _acc.unshift(`'/${file}'`);
            }
          }
          if(/\.(map|scss|less|css|js|mjs|svg|gif|eot|ttf|png|jpg|jpeg|bmp|woff|woff2|wav|mp3)$/i.test(file)) {
            _acc.unshift(/(icon|launch|splash|apple|android|tile|touch|app)/i.test(file) ? `'/favicons/${file}'` : `'/${file}'`);
          }
        }
      });
      resolve();
    });
  };

  // Main entry point and operation
  async function get_Assets() {
    console.log(`Adding external links to cache list...\n`);
    console.log(`Analyzing asset structure starting at | ${_url}/\n`);
    const result = await _Assets();
    console.log('\n...done\n');
    rewriteList();
  }

  // Write the correct caching array to file before Firebase deploy
  function rewriteList(list = _acc) {
    const serviceworker = fs.readFileSync(path.join(__dirname, '../../', _url, 'service-worker.js'), "utf8", (err, data) => err ? console.error(err.code) : data.toString()),
      _list = `[\n\t${list.join(',\n\t')}\n\t]`,
      _serviceworker = serviceworker.replace(/FILEARRAY/gi, _list);
    console.log('Adding asset list to the service-worker.js file.\n\nWriting...');
    fs.writeFile(path.join(__dirname, '../../', _url, 'service-worker.js'), _serviceworker, err => err ? console.log(err.code) : console.log(`\n...done\n\nShowing new _dist/service-worker.js file.\n\n${_serviceworker}\n\n...done`));
  }

  return get_Assets();
})();