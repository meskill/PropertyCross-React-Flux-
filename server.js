/**
 * Created by meskill on 20.02.2016.
 */

var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {
	if (req.url == '/') req.url = '/index.html';
	fs.exists(__dirname + req.url, function(exists) {
		if (!exists) {
			res.writeHead(302, {Location: '/'});
			return res.end();
		}
		var	file = __dirname + req.url;
		var stream = fs.createReadStream(file);
		stream.on('data', function (data) {
			res.write(data);
		});
		stream.on('end', function () {
			res.end();
		});
		stream.on('error', function() {
			res.end();
		})
	});
}).listen(3000, function() {
	console.log('Server started');
});