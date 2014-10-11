var express = require('express');
var app = express();
<<<<<<< HEAD
var config = require('getconfig');


function parseYelp(restaurantName, zipcode) {
	return { "Yelp": true}
}
=======
>>>>>>> 665ab7f35e2bf0bee06216c6b32677a41bfd4c60

app.get('/get-restaurant', function(req, res){
  data = { "name ": req.query.name, "price": req.query.zipcode };
  res.json(data);
  res.end();
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});