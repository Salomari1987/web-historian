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
  var filePath;
  if(asset === '/'){
    filePath = path.join(archive.paths.siteAssets, 'index.html');
  } else {
    filePath = path.join(archive.paths.archivedSites, asset);
  }
  fs.readFile(filePath,'utf8', function(err,data){
      if(err){
        callback(404, '404 file not found')
      }
      callback(200, data)
    })
};

  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

// As you progress, keep thinking about what helper functions you can put here!
