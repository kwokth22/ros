//  Include Node modules
var util = require('util'); // debug
var express = require('express');
// var multer  = require('multer');
var path = require("path");
var exphbs = require('express-handlebars');
var mysql = require('mysql');
var session = require('express-session');
// var bodyParser = require('body-parser');
// var fileUpload = require('express-fileupload');
var fs = require('fs');
var multer = require('multer');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;


//Set up storage for food picture
var storage_foodpic = multer.diskStorage({
  destination: function(request, file, cb){
    cb(null, 'uploads/foodpic');
  },
  filename: function(request, file, cb){
    cb(null, Date.now()+".jpg");
  }
});
var upload_foodpic = multer({storage: storage_foodpic});

//set up storage for user avatar
var storage_avatar = multer.diskStorage({
  destination: function(request, file, cb){
    cb(null, 'uploads/user');
  },
  filename: function(request, file, cb){
    cb(null, Date.now()+".jpg");
  }
});
var upload_avatar = multer({storage : storage_avatar});


// Handling POST method
var app = express();
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

//
app.use(session({secret: 'loginkey'}));
// app.use(passport.initialize());
// app.use(passport.session());

function checkAuth(request, response, next){
  if(!request.session.user_id){
    response.send('You are not authorized to view this page');
  }else{
    next();
  }
};




 // Connect to the mysql db
var connection = mysql.createConnection({
    host    :   '25.72.173.193',
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
    console.log(util.inspect(request.session.sysMsg));

    if(request.session){
      response.render('index',{
        layout: 'layout',
        chall: itemsRow,
        username: request.session.user_id,
        sysMsg: request.session.sysMsg
      });
    }else{
      response.render('index',{
        layout: 'layout',
        chall: itemsRow
      });
    }
    delete request.session.sysMsg;
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
        username: request.session.user_id,
        restName: itemDetail[0].Name,
        restDescription: itemDetail[0].Description,
        restImg: itemDetail[0].ImageSrc

      });
    });
});


app.post('/restaurant',upload_avatar.single(), function(request, response){
  console.log(util.inspect(request.body));
});

app.get('/InstaUp', function(request, response){
  response.render('InstaUp', {
    layout: 'layout2'
  });
});

app.post('/InstaUp',upload_foodpic.single('uploadphoto'), function(request, response){
  console.log(util.inspect(request.body));
  console.log(util.inspect(request.file));
  var ImageSrc = "../"+request.file.path;
  var newitems = {
    Name: request.body.foodname,
    restaurantname: request.body.restaurantname,
    foodtype: request.body.foodtype,
    latitude: request.body.latitude,
    longitude: request.body.longitude,
    Description: request.body.description,
    ImageSrc: ImageSrc
  };
  connection.query("INSERT INTO items set ?", newitems, function(error, result){
    if(error){
      response.status(500).end();
    }else {
      response.redirect("/");
    }

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
  if(request.session.user_id){
    console.log("You have already login");
    response.redirect('/');
  }else{
    response.render('login',{
      layout: 'layout2'
    });
  }
});



app.post('/login',upload_avatar.single(), function(request, response){
  var login_info = request.body;
  connection.query("SELECT * FROM user WHERE username = ?",[login_info.username], function(err, rows){
    if(err)
      console.log("Error");
    if(!rows.length){
      console .log("User not found");
      response.render('login',{
        layout: 'layout2',
        errorMsg: "User not found"
      });
      return;
    }
    if(rows[0].pw!=login_info.pw ){
      console.log("Wrong Password");
      response.render('login',{
        layout: 'layout2',
        errorMsg: "Wrong Password"
      });
      return;
    }
    console.log(login_info.username+" Login Successfully");
    request.session.user_id = login_info.username;
    request.session.sysMsg = {
        success: true,
        content: login_info.username+" Login Successfully"};
    response.redirect("/");
  });
});






// handling registeration
app.get('/signup/', function(request, response){
  response.render('signup',{
    layout: 'layout',
    sysMsg: request.session.sysMsg
  });
  delete request.session.sysMsg;
});

app.post('/signup', upload_avatar.single('avatar'), function (request, response) {
  console.log("A user has signed up");
  console.log(util.inspect(request.file));
  if(typeof request.file !== 'underfined'){
    var srcPath = "../img/default.jpg";
  }else{
    var srcPath = "../"+request.file.path;
  }
  connection.query('SELECT username FROM user where username = ?',request.body.username, function(error, rows){
    if(error){
      console.error(error);
      request.session.sysMsg = {
        success: false,
        content: error
      };
      response.redirect('/signup');
      return;
    }else if(rows.length>0){
      console.log(util.inspect(rows));
      request.session.sysMsg = {
        success: false,
        content: "User Name has been used"
      };
      response.redirect('/signup');
      return;
    }else{
      var userinfo = {
        username: request.body.username,
        pw: request.body.password,
        name: request.body.name,
        avatar: srcPath
      };
      connection.query('INSERT INTO user set ?', userinfo, function(error, result){
          if(error){
            console.error(error);
            request.session.sysMsg = {
              success: false,
              content: error
            };
            response.redirect('/signup');
            return;
          }else{
            response.redirect('/login');
            request.session.sysMsg = {
              success: true,
              content: "You have successfully signup"
            };
          }
      });
    }
  });
});
// handling registeration
app.get('/logout', function(request, response){
  delete request.session.user_id;
  request.session.sysMsg = {
    success: true,
    content: "You have logout"};
  response.redirect('/');
});

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
app.use('/uploads', express.static('uploads'));
// app.use(session({
//   genid: function(req) {
//     return genuuid() // use UUIDs for session IDs
//   },
//   secret: 'keyboard cat'
// }))
