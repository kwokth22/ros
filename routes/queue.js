var express = require("express");
var router = express.Router();
var connection = require('../connectionProviderDB');
var multer = require('multer');
var requestBody = multer();


//Handling url: http://hostname/queue
router.get('/', function(request, response){
        if(request.session.user_id){
          connection.query('SELECT * FROM queue, user where queue.uid = user.uid ', function(error, rows) {
            if(error){
              console.error(error+"in loading");
              response.status(500).end();
            }
          
          response.render('queue', {
            layout: 'layout',
            username: request.session.user_id,
            result: rows
            });
          });
        }
        else{
           response.redirect('/');
        }
});

router.post('/',requestBody.single(), function(request, response){
      // if(request.body.enter){
          //Get the user's id
          connection.query('SELECT uid FROM user WHERE username = ?', request.session.user_id, function(error, userInfo){
            if(error){
              console.log("1 error");
              console.log(error);
              return;
            }
          connection.query('SELECT MAX(qid) as max FROM queue', function(error, maxqid){
            if(error){
              console.log("2 error");
              console.log(error);
              return;
            }
            console.log(maxqid[0].max+1);
            //Pack the post information
            var postData = {
              qid : maxqid[0].max+1,
              uid: userInfo[0].uid,
            };
            //Insert the information to the database
            connection.query('INSERT INTO queue SET ? , datetime = now()', postData, function(error, rows){
              if(error){
                console.log("duplicate error");
                // console.log(error);
                connection.query('SELECT * FROM queue, user where queue.uid = user.uid ', function(error, rows) {
                if(error){
                  console.error(error+"in loading");
                  response.status(500).end();
                }
                var msg = "Duplicate entering queue"
                //Render the page for challenge detail
                response.render('queue', {
                  layout: 'layout',
                  username: request.session.user_id,
                  result: rows,
                  msg: msg
                  });
                });
                return;
              }
              //Regenerate the page
              response.redirect('/queue');
            });
          });
        });
      // }
      
});


module.exports = router;
