//  Include Node modules
var util = require('util'); // debug
var express = require('express');
var path = require("path");
var exphbs = require('express-handlebars');
var multer = require('multer');
var mysql = require('mysql');
var session = require('express-session');
var connection = require('./connectionProviderDB');
var fs = require('fs');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


//Enable session for the application
app.use(session({secret: 'loginkey'}));

//  Include middleware
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({defaultLayout: 'layout',extname: '.hbs'}));
app.set('view engine', '.hbs');


var login = require('./routes/login');
var accountInfo = require('./routes/accountInfo');
var registeration = require('./routes/signup');
var usage = require('./routes/usage');
var confirmation = require('./routes/confirmation');
var testing2 = require('./routes/testing2');
var queue = require('./routes/queue');
var combine = require('./routes/combine');
//Pages that are require for dynamic rendering

app.use('/login', login);
app.use('/accountInfo', accountInfo);
app.use('/signup', registeration);
app.use('/usage', usage);
app.use('/confirmation', confirmation);
app.use('/testing2',testing2);
app.use('/queue',queue);
app.use('/combine',combine);


//Pages that are required for static rendering
app.get('/', function(request, response){
    response.render('home',{
      layout: 'layout',
      username: request.session.user_id
    });
});

//Handling url http://hostname/about
app.get('/about', function(request, response){
    response.render('about',{
      layout: 'layout',
      username: request.session.user_id
    });
});

app.get('/status',function(request, response){
    response.render('status',{
      layout: 'layout4',
      username: request.session.user_id
    });
});

// app.get('/queue',function(request, response){
//     response.render('queue',{
//       layout: 'layout',
//       username: request.session.user_id
//     });
// });



app.get('/controller', function(request, response){
    if(request.session.user_id){
       response.render('controller', {
           layout: 'layout4',
           username: request.session.user_id,
      });
    }
    else{
          response.redirect('/');
    }  
});

//Handling url http://hostname/logout
app.get('/logout', function(request, response){
    delete request.session.user_id;
    request.session.sysMsg = {
      success: true,
      content: "You have logout"};
    response.redirect('/');
});

//Handling chatroom
app.get('/instantchat', function(request, response){
  //Check if the user has logged in or not
  if(request.session.user_id){
    connection.query("SELECT avatar FROM user WHERE username = ?", request.session.user_id, function(error, avatar){
      if(error){
        console.log(error);
        return;
      }
      console.log(avatar[0].avatar);
      response.render('instantchat', {
        layout: 'layout3',
        username: request.session.user_id,
        user: {
          username: request.session.user_id,
          avatar: avatar[0].avatar
        }
      });
    });
  }else{
    request.session.sysMsg = {
        success: false,
        content: "You have to login in order to join the chatroom"
      }
    response.redirect("/");
  }
});

var userCnt = 0;
//Socket.io
io.on('connection', function(socket){
	//New user
	socket.on('add user',function(msg){
		socket.username = msg.name; // Save the user name
    socket.avatar = msg.avatar;
		console.log("new user:"+msg+" logged in.");

		//Send the name to everyone
		io.emit('add new user',{
			username: socket.username,
      avatar: socket.avatar
		});
		userCnt++; //increment User counter
	});

	//Send Chat Message
	socket.on('chat message', function(msg){
		console.log(socket.username+":"+msg);

  	//New Message, send the name and msg to everyone
		io.emit('chat message', {
			username:socket.username,
      useravatar: socket.avatar,
			msg:msg
		});
	});

	// Disconnect
	socket.on('disconnect',function(){
		console.log(socket.username+" disconnected.");

		//Send the name to everyone
		io.emit('user dc',{
			username:socket.username
		});
	});
});



//  Listen to environment port or port 3000
http.listen(process.env.PORT || 3000, function(){
    console.log("Server is running ");
});
//  Static Routing for nessary element
app.use('/css',express.static('client/css'));
app.use('/font-awesome',express.static('client/font-awesome'));
app.use('/fonts',express.static('client/fonts'));
app.use('/img',express.static('client/img'));
app.use('/js',express.static('client/js'));
app.use('/uploads', express.static('uploads'));

app.use(express.static('node_modules'));