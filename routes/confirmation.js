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
                if(!rows.length)
                {
                    console.log('empty');
                    response.render('confirmation', {
                        layout: 'layout4',
                        username: request.session.user_id,
                        // receiverName : 'No ',
                        process : '0',
                        confirmed: '1',
                        sysMsg: request.session.sysMsg
                      });
                      delete request.session.sysMsg;
                }
                else
                  {
                    console.log('not empty');
                    connection.query('SELECT username as receiverName ,temp.tid as tid FROM user, (SELECT receiver, tid  FROM transcation WHERE sender = ? and confirmation = 0 and processing = 1) as temp  WHERE user.uid = temp.receiver ORDER BY tid ASC', userInfo[0].uid, function(error, receiverInfo){
                      if(error){
                        console.log(error);
                        return;
                      }   
      
                      response.render('confirmation', {
                        layout: 'layout4',
                        username: request.session.user_id,
                        receiverName : receiverInfo,
                        process : '1',
                        confirmed: '0',
                        sysMsg: request.session.sysMsg
                      });
                      delete request.session.sysMsg;
                    });
                  }
             });  
          });
        }
        else{
           response.redirect('/');
        }
});


//Handling POST action 
router.post('/',requestBody.single(), function(request, response){
      var temp = Number(request.body.tid);
      //Get the user's id
      connection.query('SELECT uid FROM user WHERE username = ?', request.session.user_id, function(error, userInfo){
        if(error){
          console.log(error);
          return;
        }
          //Update the information to the database
          connection.query('UPDATE transcation SET confirmation = 1 WHERE sender = ? and tid = ? ',[userInfo[0].uid, temp] , function(error, result){
            if(error){
              console.log("update error")
              console.log(error);
              return;
            }
            request.session.sysMsg = {
                success: true,
                content: "You package is confirmed"
              };
             console.log(request.session.sysMsg)
             response.redirect('/confirmation');
              // response.render('confirmation', {
              //     layout: 'layout4',
              //     username: request.session.user_id,
              //     confirmed: '1'
              //   });
          });
          // response.redirect('/');
 
      });
});


module.exports = router;
