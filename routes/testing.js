var express = require("express");
var router = express.Router();
var connection = require('../connectionProviderDB');
var multer = require('multer');
var requestBody = multer();

//Handling url: http://hostname/testing
router.get('/', function(request, response){
        if(request.session.user_id){
           response.render('testing', {
           layout: 'layout4',
           username: request.session.user_id,
          });
        }
        else{
           response.redirect('/');
        }
});


//Handling POST action 
router.post('/',requestBody.single(), function(request, response){
      //Get the user's id
      connection.query('SELECT uid FROM user WHERE username = ?', request.session.user_id, function(error, userInfo){
        if(error){
          console.log(error);
          return;
        }
        //Pack the post information
        var postData = {
          sender: userInfo[0].uid,
          receiver: 31
        };
        //Insert the information to the database
        connection.query('INSERT INTO transcation SET tid = NULL, ? , date = now()', postData, function(error, rows){
          if(error){
            console.log(error);
            return;
          }
          response.redirect('/');
          // response.write("Hello World");
          // response.end();
        });
      });
});


module.exports = router;
