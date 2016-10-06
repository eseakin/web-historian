var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../test/testdata/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb) {
  return new Promise((resolve, reject) => {
    fs.readFile(exports.paths.list, function(err, data) {
      if (err) {
        reject(err);
      }

      //returns each line as an item in an array
      resolve(data.toString().split('\n'));
    });
  });
};

exports.isUrlInList = function(url) {
  var result = false;

  exports.readListOfUrls().then(list => {
    for (var i = 0; i < list.length; i++) {
      if (url === list[i]) {
        result = true;
        break;
      }
    }
    return result;
  });
};

exports.addUrlToList = function(url) {
  fs.appendFile(exports.paths.list, url, err => {
    if (err) {
      throw err;
    }
  });
};

exports.isUrlArchived = function() {
};

exports.downloadUrls = function() {
};
