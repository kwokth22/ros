var express = require("express");
var router = express.Router();
var connection = require('../connectionProviderDB');

//  Basic Routing
router.get('/', function(request, response){
    if(request.session){
      response.render('index',{
        layout: 'layout',
        username: request.session.user_id,
        sysMsg: request.session.sysMsg
      });
    }
    delete request.session.sysMsg;

});


module.exports = router;
