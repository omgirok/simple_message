var db = require('../db');
var dba = require('../dba/messages.dba');
var express = require('express');
var app = express();

// app.use(bodyParser.urlencoded({extended:false}));

module.exports.getHistory = function(req, res) {
  console.log("uhh sql?begin");
  dba.getChatHistory(req, res, req.params.id);
  console.log("uhh sql?end");
  console.log("suppwiddit");
};

module.exports.sendMsg = function(req, res) {

  console.log(req.body.message);
  // console.log("user id: '" + req.params.id );
  dba.sendMessage(req, res, req.body.user_id, req.body.message);
}