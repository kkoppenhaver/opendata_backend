var express = require('express');
var app = express();
var config = require('getconfig');


function parseYelp(restaurantName, zipcode) {
	var yelp = require("yelp").createClient({
	  consumer_key: config.yelp.consumer_key, 
	  consumer_secret: config.yelp.consumer_secret,
	  token: config.yelp.token,
	  token_secret: config.yelp.token_secret
	});

	//See http://www.yelp.com/developers/documentation/v2/search_api
	yelp.search({term: restaurantName, location: zipcode}, function(error, data) {
		console.log(data);
	});
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