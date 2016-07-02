var path = require('path');
var fs = require('fs');
var httpHelper = require('path');

var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
	var url = req.url;
	if (url === '/'){ 
		fs.readFile(path.join(archive.paths.siteAssets, 'index.html'),'utf8', function(err,data){
			res.writeHead(200, {"Content-Type": "text/html"})
			res.write(data);
			res.end();
		});		
	} else{
		fs.exists(path.join(archive.paths.archivedSites, url), (exists) => {
			if(exists){
				fs.readFile(path.join(archive.paths.archivedSites, url),'utf8', function(err,data){
					res.writeHead(200, {"Content-Type": "text/html"})
					res.write(data);
					res.end();
				});	
			} else {
				res.writeHead(404, {});				
				res.end('404 not found');
			}
		})
	}

};
