var express = require('express');
var app = express();

app.get('/get-restaurant', function(req, res){
  console.log(req.query.name);
  console.log(req.query.zipcode);
  res.end();
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});