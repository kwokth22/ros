var express = require("express");
var router = express.Router();
var connection = require('../connectionProviderDB');
var multer = require('multer');
var requestBody = multer();


//Handling url: http://hostname/usage
router.get('/', function(request, response){

        //get usage
        connection.query('SELECT * FROM transcation', function(error, rows, fields) {
          if(error){
            console.error(error+"in loading");
            response.status(500).end();
          }
            for (var i in rows) {
                console.log(rows[i]);
            }
        });
        
        //Get recommendation information
        // connection.query('SELECT * FROM items WHERE foodtype = ? AND ItemID <> ? LIMIT 3', [itemDetail[0].foodtype, itemDetail[0].ItemID], function(error, recomInfo){
        //   if(error){
        //     console.error(error+"in foodtype");
        //     response.status(500).end();
        //   }
          // var location;
          // if(itemDetail[0].latitude && itemDetail[0].longitude){
          //   location = {
          //     latitude: itemDetail[0].latitude,
          //     longitude: itemDetail[0].longitude
          //   };
          // }

          //Render the page for challenge detail
          response.render('usage', {
            layout: 'layout',
            username: request.session.user_id
            
            // itemID: itemDetail[0].ItemID,
            // restName: itemDetail[0].Name,
            // restDescription: itemDetail[0].Description,
            // restImg: itemDetail[0].ImageSrc,
            // location: location,
            // postTime: itemDetail[0].date,
            // comment: postDetail,
            // rating: itemDetail[0].averagerating.toPrecision(3),
            // recommend: recomInfo
          });
        });
// });




module.exports = router;
