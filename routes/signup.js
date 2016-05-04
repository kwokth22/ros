var express = require('express');
var app = express.Router();
var multer = require('multer');
var connection = require('../connectionProviderDB');
var path = require("path");

//set up storage for user avatar
var storage_avatar = multer.diskStorage({
  destination: function(request, file, cb){
    cb(null, 'uploads/user');
  },
  filename: function(request, file, cb){
    cb(null, Date.now()+".jpg");
  }
});
//set up middleware for parsing request with avatar upload
var upload_avatar = multer({storage : storage_avatar});


//Handling url http://hostname/sigup/
app.get('/', function(request, response){
  //Display the signup page
  response.render('signup',{
    layout: 'layout',
    sysMsg: request.session.sysMsg
  });
  //Delete the sysMsg that used to show warming message
  delete request.session.sysMsg;
});


//Handling registeration action
app.post('/', upload_avatar.single('avatar'), function (request, response) {

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
      //When the username has been used by others

      //Notify the user
      request.session.sysMsg = {
        success: false,
        content: "User Name has been used"
      };
      response.redirect('/signup');
      return;
    }else{
      //Check if the user has uploaded a custom avatar
      if(request.file){
        var srcPath = path.normalize( "../"+request.file.path);
      }else{
        var srcPath = "../img/default.jpg";
      }
      //Perpare the user information object
      var userinfo = {
        username: request.body.username,
        pw: request.body.password,
        name: request.body.name,
        avatar: srcPath
      };
      //Insert the user information to the database
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
            //Upon successful registeration, notify the user
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


module.exports = app;
