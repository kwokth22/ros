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


//Handling url http://hostname/accountInfo
app.get('/', function(request, response){
  //Check if the user has logged in
  if(request.session.user_id){
    //Get the avatar for the user
    connection.query("SELECT avatar FROM user WHERE username = ?", request.session.user_id, function(error, avatar){
      if(error){
        console.log(error);
        return;
      }
      //Display the page with the user's avatar
      response.render('accountinfo', {
        layout: 'layout',
        sysMsg: request.session.sysMsg,
        username: request.session.user_id,
        avatar: avatar[0].avatar
      });
      //Delete the sysMsg session that may be used to show warming message
      delete request.session.sysMsg;
    });
  }else{
    //Redirect to the Home Page when the user hasn't logged in
    request.session.sysMsg = {
      success: false,
      content: "Your are not authorized to see this page"
    };
    response.redirect('/');
  }
});


//Handling POST action when the user changes password or avatar
app.post('/',upload_avatar.single('updateavatar'),function(request, response){
  //Check if the user has logged in
  if(request.session.user_id){
    //When the action is to change password
    if(request.query.q=="pw"){
      var newPW = request.body.password;
      var username = request.session.user_id;
      //Save the new password in the database
      connection.query("UPDATE user SET pw = ? WHERE username = ?", [newPW, username], function(error, result){
        if(error){
          console.log(error);
          return;
        }
        //Upon successful update, notify the user
        request.session.sysMsg = {
          success: true,
          content: "Your password has been updated!"
        }
        response.redirect('/accountinfo');
      });
    }else if (request.query.q=="av") {
      //When the action is to change avatar

      //Get the uploaded avatar path
      var newAva = path.normalize("../"+request.file.path);
      var username = request.session.user_id;
      //Save the path of the new avatar in the database
      connection.query("UPDATE user SET avatar = ? WHERE username = ?", [newAva, username], function(error, result){
        if(error){
          console.log(error);
          return;
        }
        //Upon successful update, notify the user
        request.session.sysMsg = {
          success: true,
          content: "Your avatar has been updated!"
        }
        response.redirect('/accountinfo');
      });
    }else{
      response.send("<h3>Illegal action!!</h3>");
    }
  }else{
    response.send("<h3>Illegal action!!</h3>");
  }
});

module.exports = app;
