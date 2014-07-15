var port = process.env.PORT || 3000;
var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
//var	io = require('socket.io').listen(server);
var nicknames = [];

server.listen(port);	

app.get('/',function(req,res){
	res.sendfile(__dirname + '/index.html');
});

});