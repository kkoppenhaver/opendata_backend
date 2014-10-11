var express = require('express');
var app = express();
var config = require('getconfig');

app.listen(process.env.PORT || 3000);


function parseYelp(restaurantName, zipcode) {
	return { "Yelp": true}
}

app.get('/get-restaurant', function(req, res){
  data = { "name ": req.query.name, "zipcode": req.query.zipcode };
  res.json(data);
  res.end();
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});