var express = require('express');
var app = express.Router();
var multer = require('multer');
var requestBody = multer();
var connection = require('../connectionProviderDB');

//Handling url http://hostname/search
app.get('/', function(request, response){
  //When the frontend is requesting the perfetch data for word matching
  if(request.query.data){
    if(request.query.data=="restaurantname"){
      //Frontend is requesting restaurant name
      connection.query("SELECT restaurantname FROM items",function(error, rows, field){
        if(error){
          console.log(error);
          return;
        }
        response.send(JSON.stringify(rows));
      });
    }else{
      //Frontend is requesting challenge name
      connection.query("SELECT name FROM items",function(error, rows, field){
        if(error){
          console.log(error);
          return;
        }
        response.send(JSON.stringify(rows));
      });
    }
  }else{
    //Display the search page
    response.render('search',{
      layout: 'layout',
      username: request.session.user_id,
      NotSearch: false
    });
  }
});

//Handling POST action for searching
app.post('/', requestBody.single(), function(request, response){
  var str = request.body.query;
  var searchBody = str.toLowerCase();
  //Query the database
  connection.query("SELECT * FROM items WHERE LOWER(Name) LIKE ? OR LOWER(restaurantname) LIKE ?", ["%"+searchBody+"%", "%"+searchBody+"%"], function(error, result){
    if(error){
      console.log(error);
      return;
    }
    //Check if the number of matched result is larger than 0 or not
    var NotSearch;
    if(result.length>0 && result[0]!=null){
      NotSearch = false;
    }else{
      NotSearch = true;
    }
    //Display the search result
    response.render('search', {
      layout: 'layout',
      searchResult: result,
      NotSearch: NotSearch,
      username: request.session.user_id
    });
  });
});

module.exports = app;
