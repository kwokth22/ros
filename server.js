//  Include Node modules
var util = require('util'); // debug
var express = require('express');
// var multer  = require('multer');
var path = require("path");
var exphbs = require('express-handlebars');
var mysql = require('mysql');
var session = require('express-session');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
var fs = require('fs');
var multer = require('multer');
var upload_avatar = multer({dest: 'uploads/user/'});
// Handling POST method
var app = express();

/*var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage}).single('avatar');*/


 // Connect to the mysql db
var connection = mysql.createConnection({
    host    :   'localhost',
    user    :   'watermelon1995',
    password:   'qwertyuiop',
    database:   'cfood_db'
});


connection.connect(function(error){
    if(error){
        console.error('error connecting: '+error.stack);
        return;
    }
    console.log('connected as id'+ connection.threadId);
});

//  Include middleware
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({defaultLayout: 'layout',extname: '.hbs'}));
app.set('view engine', '.hbs');

//  Basic Routing
app.get('/', function(request, response){
  connection.query('SELECT * FROM items', function(error, itemsRow){
    if(error){
      console.console.error(error);
      response.status(500).end();
      return;
    }
    response.render('index',{
      layout: 'layout',
      chall: itemsRow
    });
  });
});


app.get('/restaurant/', function(request, response){
    var restID = request.query.rest;
    console.log("Get /restaurant/?rest="+restID);
    connection.query('SELECT * FROM items WHERE ItemID = ?', restID, function(error, itemDetail){
      if(error){
        console.error(error);
        response.status(500).end();
        return;
      }
      response.render('restaurant', {
        layout: 'layout',
        restName: itemDetail[0].Name,
        restDescription: itemDetail[0].Description,
        restImg: itemDetail[0].ImageSrc
      });
    });
});
//alert message
app.get('/message/', function(request, response){
  response.render('message',{
    layout: 'layout',
    message: "this is alert message!",
  });
});

app.get('/login', function(request, response){
  response.render('login',{
    layout: 'layout2'
  });
});


// handling registeration
app.get('/signup/', function(request, response){
  response.render('signup',{
    layout: 'layout'
  });
});

app.post('/signup/', upload_avatar.single('avatar'), function (request, response) {
  //console.log("A new user has registered.");
  console.log("A user has signed up");
  var srcPath = request.file.path;
  var userinfo = {
    username: request.body.username,
    pw: request.body.pw,
    name: request.body.name,
    avatar: srcPath
  };
  connection.query('INSERT INTO user set ?', userinfo, function(error, result){
      if(error){
        console.error(error);
        response.redirect('/signup');
        return;
      }
      response.send("Sign up successfully");
  });






});
// handling registeration


//  Listen to environment port or port 3000
app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running ");
});



//  End connection to the db
// connection.end();

//  Static Routing
app.use('/css',express.static('client/css'));
app.use('/font-awesome',express.static('client/font-awesome'));
app.use('/fonts',express.static('client/fonts'));
app.use('/img',express.static('client/img'));
app.use('/js',express.static('client/js'));
// app.use(session({
//   genid: function(req) {
//     return genuuid() // use UUIDs for session IDs
//   },
//   secret: 'keyboard cat'
// }))
