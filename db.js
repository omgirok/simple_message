var mysql = require('mysql');
var config = require('./config');

var MySQL = function() {
  var connection;
  return {
    init: function() {
      MySQL.connection = mysql.createConnection({
        connectionLimit : 100, //important
        host     : config.DATABASE_HOST,
        user     : config.DATABASE_USER,
        password : config.DATABASE_PASSWORD,
        database : config.DATABASE_NAME
      });
      MySQL.connection.connect(function (err) {
        if (err) {
          console.log("Failed to connect: ", err);
          setTimeout(MySQL.init, 2000);
        }
      });
      MySQL.connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
        if (err) {
          console.log(err);
        } else {
          console.log('If 2 is printed, then the server was initiated correctly: ', rows[0].solution);
        }
      });
      MySQL.connection.on('error', function(err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {  // Connection to the MySQL server is usually
          console.log('reconnecting to db');
          MySQL.init();    // lost due to either server restart, or a
        } else {           // connnection idle timeout (the wait_timeout
          throw err;       // server variable configures this)
        }
      });
    }, query: function(querystring, callback) {
      MySQL.connection.query(querystring, callback);
    }, escape: mysql.escape
  }
} ();

module.exports = MySQL;
