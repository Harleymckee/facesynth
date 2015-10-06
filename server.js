var express = require('express')
// request allows us to make http requests to external apis
var request = require('request')
var path = require('path')
var fs = require('fs')
var app = express()
// node-osc is a wrapper on the module osc-min
// it has osc 'emitting' and 'recieving' functionality
var osc = require('node-osc');

// load up index.html with ejs
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

// our index route
app.get('/', function (req, res) {
  res.setHeader('Content-Type', 'text/html')
  res.render('index.html')
})

// gotta tell our node app to open its ears
var server = app.listen(3000, function() {
  console.log('listening at localhost:3000')
})

// load up socket.io and have it listen within our node server
var io = require('socket.io')(server)

// Connect our osc listener to 0.0.0.0:9999,
// where our patch is emitting events
var oscServer = new osc.Server(9999, '0.0.0.0');

// when socket.io is connected, listen for osc messages
io.on('connection', function(socket) {
  oscServer.on('message', function (msg, rinfo) {
    // when a message is recieved, http GET a randomly generated
    // user JSON blob
    request('https://randomuser.me/api/', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        // we just need the picture url string
        var picUrl = JSON.parse(body).results[0].user.picture.medium
        // emit event to front end and send over url
        io.emit('supguys', picUrl)
      }
    })
  })
})
