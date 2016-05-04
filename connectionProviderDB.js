var mysql = require('mysql');

// Connect to the mysql db
var connection = mysql.createConnection({
   host    :   '172.17.0.2',
   user    :   'watermelon1995',
   password:   '123456',
   database:   'cfood_db'
});
// Start the connection
connection.connect(function(error){
    if(error){
        console.error('error connecting: '+error.stack);
        return;
    }
    console.log('connected as id'+ connection.threadId);
});

module.exports = connection;
