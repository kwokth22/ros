var mysql = require('mysql');

// Connect to the mysql db
var connection = mysql.createConnection({
   host    :   '127.0.0.1',
   user    :   'root',
   password:   '123',
   database:   'robot'
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
