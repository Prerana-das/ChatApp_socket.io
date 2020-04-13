var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
users=[]
connections=[]


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');


});

 // app.use('/css',express.static(__dirname +'/css'));


io.sockets.on('connection', function(socket){
  	connections.push(socket)
    console.log('connected: ' ,connections.length);

    	socket.on('disconnect', function(data){
		  	connections.splice(connections.indexOf(socket),1);
		    console.log('Disconnected: ' ,connections.length);
		   });


	socket.on('send message', function(data){
		console.log(data);
	  	io.sockets.emit('new message',{msg: data, user: socket.username});
	  });


	socket.on('new user', function(data){
		console.log(data);
	  	// io.sockets.emit('new user',{msg:data});

	  	 socket.username = data;
	        users.push(socket.username);
	        updateUsernames();
	  });

		function updateUsernames() {
	        io.sockets.emit('get users', users);
	    }

  });




http.listen(3000, function(){
  console.log('listening on *:3000');
});