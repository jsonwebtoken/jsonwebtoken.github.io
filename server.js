var express = require('express');
var http = require('http');
var enforce = require('express-sslify');

var app = express();

// use HTTPS(true) in case you are behind a load balancer (e.g. Heroku)
if (process.env.NODE_ENV === 'production') {
	console.log('redirecting to ssl');
	app.use(enforce.HTTPS({ trustProtoHeader: true }))
}

app.use('/', express.static(__dirname));

http.createServer(app).listen(process.env.PORT || 3000, function() {
	console.log('started');
});
