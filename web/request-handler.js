var path = require('path');
var fs = require('fs');
var httpHelper = require('path');
var querystring = require('querystring')
var archive = require('../helpers/archive-helpers');
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
			var textTowrite = decodedBody.url+"\n"
			fs.open(archive.paths.list, 'a', 666, function (e, id){
				fs.write(id, textTowrite, null, 'utf8', function(){
					fs.close(id, function(){
						console.log(fs.readFileSync(archive.paths.list, 'utf8'), 'aaaaaaa')
						console.log('teeeeet')
					})
				})
				
			})
		})
		
	} else if (url === '/'){
		console.log(4) 
		fs.readFile(path.join(archive.paths.siteAssets, 'index.html'),'utf8', function(err,data){
			res.writeHead(200, {"Content-Type": "text/html"})
			res.write(data);
			res.end();
		});		
	} else{
		console.log(5)
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
