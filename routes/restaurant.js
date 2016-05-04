var express = require("express");
var router = express.Router();
var connection = require('../connectionProviderDB');
var multer = require('multer');
var requestBody = multer();


//Handling url: http://hostname/restaurant
router.get('/', function(request, response){
    var restID = request.query.rest;
    console.log("Get /restaurant/?rest="+restID);
    //Get challenge information
    connection.query('SELECT * FROM items WHERE ItemID = ?', restID, function(error, itemDetail){
      if(error){
        console.error(error);
        response.status(500).end();
        return;
      }
      //Get comments information
      connection.query('SELECT posts.*, user.* FROM  posts, user WHERE ItemID = ? and posts.uid= user.uid', restID,function(error, postDetail){
        if(error){
          console.error(error);
          response.status(500).end();
          return;
        }
        //Get recommendation information
        connection.query('SELECT * FROM items WHERE foodtype = ? AND ItemID <> ? LIMIT 3', [itemDetail[0].foodtype, itemDetail[0].ItemID], function(error, recomInfo){
          if(error){
            console.error(error+"in foodtype");
            response.status(500).end();
          }
          var location;
          if(itemDetail[0].latitude && itemDetail[0].longitude){
            location = {
              latitude: itemDetail[0].latitude,
              longitude: itemDetail[0].longitude
            };
          }

          //Render the page for challenge detail
          response.render('restaurant', {
            layout: 'layout',
            username: request.session.user_id,
            itemID: itemDetail[0].ItemID,
            restName: itemDetail[0].Name,
            restDescription: itemDetail[0].Description,
            restImg: itemDetail[0].ImageSrc,
            location: location,
            postTime: itemDetail[0].date,
            comment: postDetail,
            rating: itemDetail[0].averagerating.toPrecision(3),
            recommend: recomInfo
          });
        });
      });
    });
});

//Handling POST action such as giving comments or giving rating for a specfic challenges
router.post('/',requestBody.single(), function(request, response){
  if(request.body.comment){
    //Get the user's id
    connection.query('SELECT uid FROM user WHERE username = ?', request.session.user_id, function(error, userInfo){
      if(error){
        console.log(error);
        return;
      }
      //Pack the post information
      var postData = {
        uid: userInfo[0].uid,
        ItemID: request.query.post,
        comment: request.body.comment
      };
      //Insert the information to the database
      connection.query('INSERT INTO posts SET date = now(), ?', postData, function(error, rows){
        if(error){
          console.log(error);
          return;
        }
        //Regenerate the page
        response.redirect('/restaurant?rest='+request.query.post);
      });
    });
  }else if (request.body.rating) {
    //Get the current number of rating for the challenge
    connection.query('SELECT ratednum, averagerating FROM items WHERE ItemID =?', request.query.rating, function(error, ratingRow){
      if(error){
        console.log(error);
        return;
      }
      //Calculate the new rating
      var currentRating = ratingRow[0].averagerating;
      var newRatedNum = ratingRow[0].ratednum+1;
      var newRating = ((currentRating*(ratingRow[0].ratednum) + Number(request.body.rating))/newRatedNum).toPrecision(5);
      var updated = {
        ratednum: newRatedNum,
        averagerating : newRating
      };
      //Update the database
      connection.query('UPDATE items SET ? WHERE ItemID = ?', [updated,request.query.rating], function(error, result){
        if(error){
          console.log(error);
          return;
        }
        //Regenerate the page
        response.redirect('/restaurant?rest='+request.query.rating);
      });
    });
  }
});


module.exports = router;
