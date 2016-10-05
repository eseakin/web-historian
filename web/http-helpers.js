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

exports.serveAssets = function(res, asset, callback) {
  var thisPath = asset === '/' ? './web/public/index.html' : './web/public' + asset;
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
  console.log(archive.isUrlInList('www.example.com'));
};


// As you progress, keep thinking about what helper functions you can put here!
