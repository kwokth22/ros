var express = require("express");
var router = express.Router();
var connection = require('../connectionProviderDB');
var multer = require('multer');
var requestBody = multer();

//Handling url: http://hostname/confirm
router.get('/', function(request, response){
        if(request.session.user_id){
            connection.query('SELECT uid FROM user WHERE username = ?', request.session.user_id, function(error, userInfo){
              if(error){
                console.log(error);
                return;
              }
              //get receiver and process information
              connection.query('SELECT receiver, processing FROM transcation WHERE sender = ? and confirmation = 0 and processing = 1', userInfo[0].uid, function(error, rows){
                if(error){
                  console.log(error);
                  return;
                } 
                //need check the rows empty or not
                console.log(rows);  
                connection.query('SELECT username as receiver FROM user WHERE uid = ? ', rows[0].receiver, function(error, receiverInfo){
                  if(error){
                    console.log(error);
                    return;
                  }   
  
                  response.render('confirmation', {
                    layout: 'layout4',
                    username: request.session.user_id,
                    receiverName : receiverInfo[0].receiver,
                    process : rows[0].processing
                  });
                });
             });  
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
       connection.query('SELECT receiver FROM transcation WHERE sender = ? and processing = 1', userInfo[0].uid, function(error, rows){
        if(error){
          console.log("get receiver error");
          console.log(error);
          return;
        } 
        // console.log(rows[0].receiver);
          //Update the information to the database
          connection.query('UPDATE transcation SET confirmation = 1 WHERE sender = ? and receiver = ? and confirmation = 0 and processing = 1',[userInfo[0].uid, rows[0].receiver] , function(error, result){
            if(error){
              console.log("update error")
              console.log(error);
              return;
            }
             response.redirect('/');
          });
          // response.redirect('/');
        });
      });
});


module.exports = router;
