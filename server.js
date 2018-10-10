var http    = require("http"); 
var express = require('express');
var io      = require("socket.io");         // web socket external module
var easyrtc = require("easyrtc"); 
// var app = express();
// app.use(express.static(__dirname + '/public')); //__dir and not _dir
// var port = 8200; // you can use any port
// app.listen(port);

var httpApp = express();
httpApp.use(express.static(__dirname + '/views'));

// Start Express http server on port 8080
var webServer = http.createServer(httpApp).listen(8000);

// Start Socket.io so it attaches itself to Express server
var socketServer = io.listen(webServer);

// Start EasyRTC server
var easyrtcServer = easyrtc.listen(httpApp, socketServer);
console.log('server on' + 8000);
