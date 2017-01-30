var express = require('express');

var app = express();
app.use('/', express.static('../app/'));
app.use('/bower_components', express.static('../bower_components/'));

var http = require('http').Server(app);
var io = require('socket.io')(http);

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var tickets = [
  {
    'title': 'Welcome to RealTime App!',
    'desc': 'RealTime App helps you to resolve sharing text, code, \nlink between multiple computers in LAN\nYou just access the localhost and enjoy.'
  },
];

app.get('/tickets', function (req, res) {
  'use strict';
  res.setHeader("Content-Type", "text/html");
  console.log(tickets);
  res.write(JSON.stringify(tickets));
  res.end();
});

app.post('/tickets', jsonParser, function (req, res) {
  'use strict';
  
  if (!req.body) {
    return res.sendStatus(400);
  }
  tickets.push(req.body);

  io.emit('ticket', req.body);
  return res.sendStatus(200);
});

http.listen(3000, function () {
  'use strict';
});
