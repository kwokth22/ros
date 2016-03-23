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
    Description: 'on9 on99 on999 on9 on99 on999 on9 on99 on999 on9 on99 on999 on9 on99 on999 on9 on99 on999 on9 on99 on999 on9 on99 on999 on9 on99 on999',
    ImageSrc: '../img/Spicy1.jpg'
    },
    {
    ItemID: 2,
    Name: 'Hot Fried Chicken Ramen',
    Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.',
    ImageSrc: '../img/Spicy2.jpg'
    },
    {
    ItemID: 3,
    Name: 'Name 1',
    Description: 'I am handsome3!',
    ImageSrc: '../img/Spicy3.jpg'
    },
    {
    ItemID: 4,
    Name: 'Fantasy Taste in CUHK',
    Description: 'I am handsome4!',
    ImageSrc: '../img/franklin.jpg'
    },
    {
    ItemID: 5,
    Name: 'Heavy Taste',
    Description: 'I am handsome5!',
    ImageSrc: '../img/Chesse1.jpg'
    },
    {
    ItemID: 6,
    Name: 'Taste',
    Description: 'I am handsome6!',
    ImageSrc: '../img/Spicy2.jpg'
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
    response.render('restaurant');
});





//  Listen to environment port or port 3000
app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on :  https://cfood-watermelon1995.c9users.io/");
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