var db = require('../db');



module.exports.getChatHistory = function(req, res, id) {
  queryString = 'SELECT message FROM Messages WHERE to_user = ' + id;
  console.log("executing query '" + queryString + "' ...");
  db.query(queryString, function(err, rows) {
    if (err){
      res.json({success: false, error_message: err + "Query failed"});
    } else {
      res.json({success: true, messages: rows});
    };
  });
};

module.exports.sendMessage = function(req, res, id, msg) {
  queryString = "INSERT INTO Messages (to_user,message) VALUES ('" + id + "','" + msg + "');";
  console.log("executing query ...'" + queryString + "' ...");
  db.query(queryString, function(err, rows) {
    if (err) {
      res.json({success: false, error_message: err + "Query failed"});
    } else {
      res.json({success: true, messages: rows});
    };
  });
};
