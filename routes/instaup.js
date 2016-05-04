var express = require('express');
var app = express.Router();
var multer = require('multer');
var connection = require('../connectionProviderDB');
var path = require("path");

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

//Handling url http://hostname/InstaUp
app.get('/', function(request, response){
  //Check if the user has logged in
  if(request.session.user_id){
    response.render('InstaUp', {
      layout: 'layout',
      username: request.session.user_id
    });
  }else{
    //Notify the user to login before creating new Challenges
    request.session.sysMsg = {
        success: false,
        content: "You have to login in order to upload new challenges"};
    response.redirect('/');
  }
});

//Handling POST action for creating new challenges
app.post('/',upload_foodpic.single('uploadphoto'), function(request, response){
  //Pack the challenge information
  var ImageSrc =path.normalize( "../"+request.file.path);
  //When the user specify the location of the challenge
  if(request.body.latitude && request.body.longitude){
    var newitems = {
      Name: request.body.foodname,
      restaurantname: request.body.restaurantname,
      foodtype: request.body.foodtype,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
      Description: request.body.description,
      ImageSrc: ImageSrc
    };
  }else{
    var newitems = {
      Name: request.body.foodname,
      restaurantname: request.body.restaurantname,
      foodtype: request.body.foodtype,
      Description: request.body.description,
      ImageSrc: ImageSrc
    };
  }
  //Insert the challenge package to the database
  connection.query("INSERT INTO items set date = now(), ?", newitems, function(error, result){
    if(error){
      console.log(error);
      response.status(500).end();
    }else {
      //Upon successful action, redirect to the home page
      response.redirect('/');
    }
  });
});

module.exports = app;
