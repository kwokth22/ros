var express = require("express");
var router = express.Router();
var connection = require('../connectionProviderDB');
var multer = require('multer');
var requestBody = multer();


//Handling url: http://hostname/usage
router.get('/', function(request, response){
        //get usage
        connection.query('SELECT count(date) as count,date FROM transcation group by date', function(error, rows) {
          if(error){
            console.error(error+"in loading");
            response.status(500).end();
          }
        var dailyCounter = [];
        for (var i in rows) {
                dailyCounter.push(rows[i].count);
        }
            
        // get year month day and push
        var yearArray = []; var monthArray = []; var dayArray = [];
        for (var i in rows){
          yearArray.push(rows[i].date.getFullYear());
          monthArray.push (rows[i].date.getMonth()+1);
          dayArray.push(rows[i].date.getDate());
        }
        //print dailycount
        for(var i in rows){
          console.log(dailyCounter[i]);
        }
        //print year month day
        for(var i in rows){
          console.log(yearArray[i]);
          console.log(monthArray[i]);
          console.log(dayArray[i]);
        }
        //Render the page for challenge detail
        response.render('usage', {
           layout: 'layout',
           username: request.session.user_id,
           year: yearArray,
           month: monthArray,
           day: dayArray,
           count: dailyCounter
          });
        });
 });


module.exports = router;
