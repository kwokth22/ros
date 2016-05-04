var express = require('express');
var app = express.Router();
var multer = require('multer');
var connection = require('../connectionProviderDB');
var upload_avatar = multer();


//Showing Login Page
app.get('/', function(request, response){
  //Check if the user has already logged in
  if(request.session.user_id){
    request.session.sysMsg = {
      success: false,
      content: " You have already logged in."
    }
    response.redirect('/');
  }else{
    response.render('login',{
      layout: 'layout2'
    });
  }
});


//Verify the login information and perform login action
app.post('/',upload_avatar.single(), function(request, response){
  //Get the user information
  var login_info = request.body;
  connection.query("SELECT * FROM user WHERE username = ?",[login_info.username], function(err, rows){
    if(err)
      console.log("Error");
    //Check if the username exist
    if(!rows.length){
      response.render('login',{
        layout: 'layout2',
        errorMsg: "User not found"
      });
      return;
    }
    //Check if the password is correct
    if(rows[0].pw!=login_info.pw ){
      response.render('login',{
        layout: 'layout2',
        errorMsg: "Wrong Password"
      });
      return;
    }
    //Upon success login, redirect to the home page and notify the user
    request.session.user_id = login_info.username;
    request.session.sysMsg = {
        success: true,
        content: login_info.username+" Login Successfully"};
    response.redirect("/");
  });
});





module.exports = app;
