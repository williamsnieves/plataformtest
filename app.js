var port = process.env.PORT || 3000;
var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var	io = require('socket.io').listen(server);
var nicknames = [];

server.listen(port);	

app.get('/',function(req,res){
	res.sendfile(__dirname + '/index.html');
});

io.sockets.on("connection",function(socket){
	socket.emit("bienvenida",{text:'Ahora estas conectado'});

	socket.on("nickname",function(data,callback){
		if(nicknames.indexOf(data) != -1){
			callback(false);
		}else{
			callback(true);
			nicknames.push(data);
			socket.nickname = data;
			io.sockets.emit("nicknames",nicknames);
			console.log("listado: "+nicknames);
		}		
	});

	socket.on("user message",function(data){
		io.sockets.emit("user message",{
			nick:socket.nickname,
			message:data
		});
	});

	socket.on("disconnect",function(){
		if(!socket.nickname) return;
		nicknames.splice(nicknames.indexOf(socket.nickname),1);
		console.log("listado nuevo: "+nicknames);
	});
	/*socket.on("nickname",function(data,fn){
		if(nicknames.indexOf(data) != -1){
			fn(true);
		}else{
			fn(false);
			nicknames.push(data);
			socket.nickname = data;
			io.socket.emit("nicknames",nicknames);
		}
	});

	socket.on("user message",function(data){
		io.socket.emit("user message",{
			nick:socket.nickname,
			message:data
		});
	});

	socket.on("disconnect",function(){
		if(!socket.nicknames) return;
		nicknames.splice(nicknames.indexOf(socket.nickname),1);
	});*/
});