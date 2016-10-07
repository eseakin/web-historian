var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../test/testdata/sites'),
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

exports.readListOfUrls = function(pathName) {
  var pathName = pathName || exports.paths.list;
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




exports.addUrlToList = function(url) {
  console.log('addUrlToList', url);
  return new Promise((resolve, reject) => {
    fs.appendFile(exports.paths.list, '\n' + url, err => {
      if (err) {
        reject(err);
      }
      resolve('loading.html');
    });
  });
};

exports.isUrlArchived = function(url) {
  return new Promise((resolve, reject) => {
    fs.readdir(exports.paths.archivedSites, (err, files) => {
      if (files.includes(url)) {
        resolve(url);
      } else {
        resolve('loading.html');
      }
    });
  });
};

exports.returnWebData = function(filePath) {
  return new Promise((resolve, reject) => {
    resolve('/' + filePath);
  });
};

//for worker
exports.getUrlsToDownload = function () {
  return exports.readListOfUrls('/Users/student/Desktop/2016-09-web-historian/test/testdata/sites.txt')
  .then(urls => {
    return Promise.all(
      urls.map((url) => {
        return new Promise((resolve, reject) => {
          fs.readdir(exports.paths.archivedSites, (err, files) => {
            if (files.includes(url)) {
              resolve(null);
            } else {
              resolve(url);
            }
          });
        });
      })
    );
  });
};


exports.downloadUrls = function (urlArray) {
  urlArray.forEach(url => { 
    console.log('downloadUrls working on ', url);

    if (url === null) {
      console.log('url is null, returning');
      return;
    }
    request('http://' + url, function(error, response, data) {
      if (error) {
        throw error;
      }
      fs.writeFile('/Users/student/Desktop/2016-09-web-historian/test/testdata/sites/' + url, data);
    });
  });
};











