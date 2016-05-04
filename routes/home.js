var express = require("express");
var router = express.Router();
var connection = require('../connectionProviderDB');

//  Basic Routing
router.get('/', function(request, response){
  //Get all challenges in the database
  connection.query('SELECT * FROM items ', function(error, itemsRow){
    if(error){
      console.error(error);
      response.status(500).end();
      return;
    }
    if(request.session){
      response.render('index',{
        layout: 'layout',
        chall: itemsRow,
        username: request.session.user_id,
        sysMsg: request.session.sysMsg
      });
    }else{
      response.render('index',{
        layout: 'layout',
        chall: itemsRow
      });
    }
    delete request.session.sysMsg;
  });
});


module.exports = router;
