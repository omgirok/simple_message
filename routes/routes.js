/*
    This file has all the routes for app
*/




var express = require('express');
var app = express();
var messages = require('./messages');
var db = require('../db');
var bodyParser = require('body-parser');

var urlParser = bodyParser.urlencoded({extended: false});


function getHistory(req, res) {
  // console.log("uhh sql?begin");
  // dba.getChatHistory(req, res, req.params.id);
  // console.log("uhh sql?end");
  queryString = 'SELECT message FROM Messages WHERE to_user = ' + req.params.id;
  console.log("executing query '" + queryString + "' ...");
  db.query(queryString, function(err, rows) {
    if (err){
      res.json({success: false, error_message: err + "Query failed"});
    } else {
      res.json({success: true, messages: rows});
    };
  });
};


function testShit(req,res) {
  var reply = "asjdkflajlskdfkjlasdf";
  console.log("ajsdklfajsdlkflasdjklf");
  res.send(reply);
};


// home page
app.get('/', function(req,res) {
  res.redirect('m/index-2.html');
})

app.get('/messages/history/:id', messages.getHistory);
app.post('/messages/send', urlParser, messages.sendMsg);
// app.get('/messages/history/:id', getHistory);
app.get('/testshit', testShit);

module.exports = app;