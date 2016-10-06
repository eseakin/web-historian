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

exports.readListOfUrls = function() {
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
  return exports.readListOfUrls().then(list => {
    var result = false;
    for (var i = 0; i < list.length; i++) {
      if (url === list[i]) {
        result = true;
        break;
      }
    }
    return result;
  });
};

exports.handlePost = function(url) {
  return exports.isUrlInList(url).then( isInList => {
    if (isInList) {
      return isUrlArchived(url);
    } else {
      return addUrlToList(url);
    }
  });
};



exports.addUrlToList = function(url) {
  return new Promise((resolve, reject) => {
    fs.appendFile(exports.paths.list, '\n' + url, err => {
      if (err) {
        reject(err);
      }
      console.log('added url ', url);
      return returnWebData('loading.html');
    });
  });
};

exports.isUrlArchived = function(url) {
  return new Promise((resolve, reject) => {
    fs.readdir(exports.paths.archivedSites, (err, files) => {
      if (files.includes(url)) {
        returnWebData(url);
      } else {
        returnWebData('loading.html');
      }
    });
  });
};

exports.returnWebData = function(filePath) {
  return new Promise((resolve, reject) => {
    resolve('/' + filePath);


  });
  //download url
    //resolve file path to url
};

exports.downloadUrls = function (urlArray) {

};











