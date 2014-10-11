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

app.get('/get-opendata', function (req, res) {
    data = { "name": req.query.name, "zip": req.query.zip };
    res.json(data);
    res.end();
});

// get is a simple wrapper for request()
// which sets the http method to GET
var getOpenData = http.get(url, function (response) {
    // data is streamed in chunks from the server
    // so we have to handle the "data" event    
    var buffer = "",
        data,
        route;

    response.on("data", function (chunk) {
        buffer += chunk;
    });

    response.on("end", function (err) {
        // finished transferring data
        // dump the raw data
        console.log(buffer);
        console.log("\n");
        data = JSON.parse(buffer);
        res.end(data);
    });
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});