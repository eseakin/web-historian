// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var path = require('path');
var fs = require('fs');
var request = require('request');
var archive = require('../helpers/archive-helpers');

archive.getUrlsToDownload().then( urlArray => {
  exports.downloadUrls(urlArray);
});
