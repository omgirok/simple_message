var express = require('express')
var path = require('path')
var app = express()
var db = require('./db')
var routes = require('./routes/routes')

db.init()


app.use('/m/', express.static('public'))
app.use('/', routes);

// app.get('/', function (req, res) {
//   //res.location(path.join(__dirname + '/m/'+ 'index-2.html'));
//   res.redirect('m/index-2.html');
// })

var server = app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

