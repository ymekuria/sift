var pg = require('pg');
var app = require('../server.js')
var db = require('../utils/dbconnect.js');
// var io = require('socket.io')(app);

// io.on('connection', function (socket) {
// 	console.log('user connected')
//   socket.emit('server event', { foo: 'bar' });
//   socket.on('client event', function (data) {
//     console.log(data);
//   });
// });