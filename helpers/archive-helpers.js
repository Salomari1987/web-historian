var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var request = require('request')
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
	fs.readFile(exports.paths.list, 'utf8', function (err, content) {
	  if (err) {
	  	callback(err);
	  } else {
	  	var urls=content.split('\n')
	  	callback(urls)
	  }	
	});
};

exports.isUrlInList = function(file, callback) {
	exports.readListOfUrls(function(urls){
		if(urls.indexOf(file)===-1){
			callback(false);
		}else{
			callback(true);
		}
	})
};

exports.addUrlToList = function(url, callback) {
	var textToAppend = url+"\n"
	exports.isUrlInList(url, function(flag){
		if(!flag){
			fs.appendFile(exports.paths.list, textToAppend, function(err){
				if(!err) callback();
			})
		}		
	})

};

exports.isUrlArchived = function(url, callback) {
	var filePath = path.join(exports.paths.archivedSites, url)
	fs.exists(filePath, (exists) => {
		if(exists){
			callback(true);
		}else{
			callback(false)
		}
	})
};

exports.downloadUrls = function(urlArray) {
	for(var i=0; i<urlArray.length; i++){
		if(!urlArray[i]){ return;}
			request('http://'+ urlArray[i]).pipe(fs.createWriteStream(exports.paths.archivedSites + "/" + urlArray[i]));
		}
};
