var express = require("express");
var router = express.Router();
var connection = require('../connectionProviderDB');
var multer = require('multer');
var requestBody = multer();

//Handling url: http://hostname/adding
router.get('/', function(request, response){
        if(request.session.user_id){
            connection.query('SELECT uid FROM user WHERE username = ?', request.session.user_id, function(error, userInfo){
              if(error){
                console.log(error);
                return;
              }
              //get receiver and process information
              connection.query('SELECT uid, username as receiverName FROM user WHERE uid <> ? ', userInfo[0].uid, function(error, rows){
                if(error){
                  console.log(error);
                  return;
                } 

                // console.log(rows);  
                response.render('adding', {
                    layout: 'layout',
                    username: request.session.user_id,
                    receiverName : rows,
                    sysMsg: request.session.sysMsg
                });
                delete request.session.sysMsg;
             });  
          });
        }
        else{
           response.redirect('/');
        }
});


//Handling POST action 
router.post('/',requestBody.single(), function(request, response){
      // console.log(Number(request.body.testing));
      var temp = Number(request.body.rid); 
      //Get the user's id
      connection.query('SELECT uid FROM user WHERE username = ?', request.session.user_id, function(error, userInfo){
        if(error){
          console.log(error);
          return;
        }
          //Update the information to the database
          connection.query('INSERT INTO transcation SET tid = NULL, sender = ?, receiver = ?, date = NOW(), confirmation = 0, processing = 0',[userInfo[0].uid, temp] , function(error, result){
            if(error){
              console.log("insert error")
              console.log(error);
              return;
            }
            request.session.sysMsg = {
                success: true,
                content: "Transcation added"
              };
             response.redirect('/adding');
             return;
          });
      });
});


module.exports = router;
