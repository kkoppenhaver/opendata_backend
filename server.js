var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('Hello World!');
});

app.get('/yelp', function(req, res){
  res.send('Yelp');
});

app.get('/opentable', function(req, res){
  res.send('Opentable');
});

app.get('/grubhub', function(req, res){
  res.send('Grubhub');
});

app.get('/groupon', function(req, res){
  res.send('Groupon');
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});