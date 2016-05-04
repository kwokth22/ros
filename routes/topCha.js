var express = require('express');
var app = express.Router();
var connection = require('../connectionProviderDB');

//Handle url http://hostname/topCha
app.get('/', function(request, response){
  //Get the top 5 rated challenge item in the database
  connection.query("SELECT * FROM items ORDER BY averagerating DESC LIMIT 5",function(error, topchall){
    if(error){
      console.log(error);
      response.status(500).end();
      return;
    }
    //Render the page
    response.render('topchall', {
      layout: 'layout',
      chall: topchall,
      username: request.session.user_id
    });
  });
});

module.exports = app;
