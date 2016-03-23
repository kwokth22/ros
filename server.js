//  Include Node modules
var express = require('express');
var path = require("path");
var exphbs = require('express-handlebars');
// var mysql = require('mysql');
var app = express();



//  Test database (testing dynamic rendering only)
var Challenge = {
    "ChallengeList":[{
    ItemID: 1,
    Name: 'Spicy beef tendon noodles',
    Description: 'Spicy as hell, it cannot eat anymore. Water or milk plz!!!!!!!!!',
    ImageSrc: '../img/Spicy1.jpg'
    },
    {
    ItemID: 2,
    Name: 'Hot Fried Chicken Ramen',
    Description: 'LOL, I cannot eat again. The hottest ramen ever. If you love spicy food, you must like this ramen',
    ImageSrc: '../img/Spicy2.jpg'
    },
    {
    ItemID: 3,
    Name: 'Spicy boiled beef with rice',
    Description: 'Easy, not so spicy then TamJi SamGor mixian.',
    ImageSrc: '../img/Spicy3.jpg'
    },
    {
    ItemID: 4,
    Name: 'Fantasy Taste in CUHK',
    Description: 'Discover the most fantastic restaurant in CUHK.',
    ImageSrc: '../img/franklin.jpg'
    },
    {
    ItemID: 5,
    Name: 'Heavy Taste',
    Description: 'Cheese!Cheese!Cheeses everywhere!',
    ImageSrc: '../img/Chesse1.jpg'
    },
    {
    ItemID: 6,
    Name: 'Taste',
    Description: 'Tasty Road, Let\'s eat it',
    ImageSrc: '../img/hotdog.jpg'
    }
    ] 
};

//  Include middleware
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({defaultLayout: 'layout',extname: '.hbs'}));
app.set('view engine', '.hbs');

//  Basic Routing
app.get('/', function(request, response){
    response.render('index',{
        layout: 'layout',
        chall: Challenge.ChallengeList
    });
});


app.get('/restaurant/', function(request, response){
    var restID = request.query.rest;
    console.log("Get /restaurant/?rest="+restID);
    for(i=0;i<Challenge.ChallengeList.length;i++){
        if(Challenge.ChallengeList[i].ItemID==restID){
            response.render('restaurant',{
                layout: 'layout',
                restName: Challenge.ChallengeList[i].Name,
                restDescription: Challenge.ChallengeList[i].Description,
                restImg: Challenge.ChallengeList[i].ImageSrc
            });
            return;
        }
    }
    response.redirect('/');
});





//  Listen to environment port or port 3000
app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running ");
});

//  Connect to the mysql db
// var connection = mysql.createConnection({
//     host    :   'localhost',
//     user    :   'admin',
//     pass    :   'hihi',
//     database:   'cfood'
// });

// connection.connect(function(error){
//     if(error){
//         console.error('error connecting: '+error.stack);
//         return;
//     }
//     console.log('connected as id'+ connection.threadId);
// });




//  End connection to the db
// connection.end();

//  Static Routing 
app.use('/css',express.static('client/css'));
app.use('/font-awesome',express.static('client/font-awesome'));
app.use('/fonts',express.static('client/fonts'));
app.use('/img',express.static('client/img'));
app.use('/js',express.static('client/js'));