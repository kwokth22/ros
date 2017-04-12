var express = require("express");
var router = express.Router();
var connection = require('../connectionProviderDB');
var multer = require('multer');
var requestBody = multer();

//Handling url: http://hostname/process
router.get('/', function(request, response){
        if(request.session.user_id){
            connection.query('SELECT uid FROM user WHERE username = ?', request.session.user_id, function(error, userInfo){
              if(error){
                console.log(error);
                return;
              }
              //get receiver and process information
              connection.query('SELECT tid, sender,count(*) as number, processing FROM transcation WHERE sender = ? and confirmation = 0 and processing = 0', userInfo[0].uid, function(error, count){
                if(error){
                  console.log(error);
                  return;
                } 
      
                //need check the rows empty or not
                console.log(count);  
                if(!count.length)
                {
                    console.log('empty');
                    response.render('processing', {
                        layout: 'layout4',
                        username: request.session.user_id,
                        receiverName : 'No package is deliver to other user',
                        process : '0',
                        count : 'No package is being process'
                      });
                }
                else
                  {
                    console.log('not empty');
                    connection.query('SELECT username as receiverName ,temp.tid as tid FROM user, (SELECT receiver, tid  FROM transcation WHERE sender = ? and confirmation = 0 and processing = 0) as temp  WHERE user.uid = temp.receiver', userInfo[0].uid, function(error, result){
                      if(error){
                        console.log(error);
                        return;
                      }
                    console.log(result);   
                    response.render('processing', {
                            layout: 'layout4',
                            username: request.session.user_id,
                            count: count[0].number,                        
                            receiverName: result
                        });
                      // });
                    });
                  }
             });  
          });
        }
        else{
           response.redirect('/');
        }
});


// //Handling POST action 
router.post('/',requestBody.single(), function(request, response){
      //Get the user's id
      connection.query('SELECT uid FROM user WHERE username = ?', request.session.user_id, function(error, userInfo){
        if(error){
          console.log(error);
          return;
        }
       connection.query('SELECT receiver FROM transcation WHERE sender = ? and processing = 0', userInfo[0].uid, function(error, rows){
        if(error){
          console.log("get receiver error");
          console.log(error);
          return;
        } 
        // console.log(rows[0].receiver);
          //Update the information to the database
          connection.query('UPDATE transcation SET processing = 1 WHERE sender = ? and receiver = ? and tid = ?',[userInfo[0].uid, rows[0].receiver] , function(error, result){
            if(error){
              console.log("update error")
              console.log(error);
              return;
            }
            request.session.sysMsg = {
                success: true,
                content: "You package is confirmed"
              };
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
});


module.exports = router;
