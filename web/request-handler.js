var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var fs = require('fs');
var helpers = require('./http-helpers');
// require more modules/folders here!
var FIXME = ['fixme'];

exports.handleRequest = function (req, res) {
  var parsedUrl = url.parse(req.url);

  if (req.method === 'GET') {
    //helpers.testyTest();
    helpers.serveAssets(res, parsedUrl.pathname);

  } else if (req.method === 'POST') {
    var body = [];
    req.on('data', function(c) {
      body.push(c);
    }).on('end', function() {
      body = body.join('').split('=')[1];
      console.log('server posting ', body);

      archive.handlePost(body).then( url => {
        res.writeHead(201, helpers.headers);
        helpers.serveAssets(res, url);
      });
    });
  }
};


