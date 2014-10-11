var express = require('express');
var app = express();
var config = require('getconfig');

app.listen(process.env.PORT);

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});


function parseYelp(restaurantName, zipcode) {
	return { "Yelp": true}
}

app.get('/get-restaurant', function(req, res){
  data = { "name": req.query.name, "zipcode": req.query.zipcode, "searchCompleted": true };
  res.json(data);
  res.end();
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});