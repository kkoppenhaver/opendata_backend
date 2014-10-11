var express = require('express');
var app = express();
var config = require('getconfig');


function parseYelp(restaurantName, zipcode) {
	return { "Yelp": true}
}

app.get('/get-restaurant', function(req, res){
  yelpData = parseYelp(req.query.name, req.query.zipcode);
  data = { "name ": req.query.name, "price": req.query.zipcode, "yelp": yelpData };
  res.json(data);
  res.end();
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});