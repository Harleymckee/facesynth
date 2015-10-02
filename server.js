var express = require('express')
var path = require('path')
var fs = require('fs')
var app = express()

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use(express.static(path.join(__dirname + '/client')))

var server = app.listen(3000, function() {
  console.log('listening at localhost:3000')
})

function home (req, res) {
  res.setHeader('Content-Type', 'text/html')
  res.render('index.html')
}

app.get('/', home)

var io = require('socket.io')(server)

io.on('connection', function(socket) {
  var OscReceiver = require('osc-receiver')
    , receiver = new OscReceiver();
  // hook it to a port
  receiver.bind(9999);
  // listen for the message osc event
  receiver.on('message', function() {
    var args = Array.prototype.slice.call(arguments, 1);
    // emit to front end
    //io.emit('supguys', args)
  })
})
