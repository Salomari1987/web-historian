var path = require('path');
var fs = require('fs');
var path = require('path');
var querystring = require('querystring')
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers')
// require more modules/folders here!

exports.handleRequest = function (req, res) {
	var url = req.url;
	var method = req.method;
	if(method === "POST"){
		var fullBody = ''
		req.on('data', function(chunk){
			fullBody+=chunk.toString();
		})
		req.on('end', function(){
			var decodedBody = querystring.parse(fullBody);
			archive.addUrlToList(decodedBody.url, function(){
				res.writeHead(302, {})
				res.end()
			})					
		})
		
	} else {
		httpHelper.serveAssets(null, url, function(resCode, d){
			res.writeHead(resCode);
			res.end(d);
		})
	}
};