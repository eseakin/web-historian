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
    });
    req.on('end', function() {
      body = body.join('').split('=')[1];

      // archive.getUrlsToDownload().then( urlArray => {
      //   console.log('downloading urls');
      //   archive.downloadUrls(urlArray);
      // });

     
      archive.isUrlInList(body).then( isInList => {
        if (isInList) {
          return archive.isUrlArchived(body);
        } else {
          return archive.addUrlToList(body);
        }
      }).then( newUrl => {
        return archive.returnWebData(newUrl);
      }).then( webDataReturn => {
        res.writeHead(201, helpers.headers);
        helpers.serveAssets(res, webDataReturn);
      });
    });
  }
};


