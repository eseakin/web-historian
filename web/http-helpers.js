var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, inputPath, callback) {
  var thisPath;
   // = inputPath === '/' ? './web/public/index.html' : './web/public' + inputPath;

  if (inputPath === '/') {
    thisPath = './web/public/index.html';
  } else if (inputPath === '/styles.css') {
    thisPath = './web/public/styles.css';
  } else if (inputPath === '/loading.html') {
    thisPath = './web/public/loading.html';
  } else {
    thisPath = './test/testdata/sites' + inputPath;
  }

  fs.readFile(thisPath, function(err, data) {
    if (err) {
      res.writeHead(404, exports.headers);
      res.end('404 not found!!');
    } else {
      res.writeHead(200, exports.headers);
      res.end(data);
    }
  });
};


exports.testyTest = function () {
  console.log('testytest', archive.writeFile('example1.com'));
};


// As you progress, keep thinking about what helper functions you can put here!
