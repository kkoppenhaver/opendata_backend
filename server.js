var express = require('express');
var app = express();

app.get('/get-restaurant', function(req, res){
  data = { "name ": req.query.name, "price": req.query.zipcode };
  res.json(data);
  res.end();
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});