var http = require("http");
var express = require('express');
var app = express();
var request = require("request");
var string = require("string");

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
    console.log('testing stuff');
    dataIn = { "name": req.query.name, "zip": req.query.zip };
    console.log(dataIn);
    console.log('calling open data function');
    getOpenData(dataIn.name, dataIn.zip, res);
});

var getOpenData = function (name, zip, response) {
    console.log('in open data function');
    openDataUrl = process.env.openDataUrl ||  config.openData.url;
    apiKey = process.env.openDataApiKey || config.openData.apiKey;

    var url = openDataUrl + "collections/restaurants?q={ \"DBA Name\": " + name + ", Zip: " + zip + "}&apiKey=" + apiKey;
    console.log(url);
    var openDataResults;
    request.get(url, function (e, r, openDataResults) {
        var data = JSON.parse(openDataResults);
        var firstData = data[0];

        var output =
        {
            "Name": firstData["DBA Name"],
            "Address1": firstData["Address"],
            "City": firstData["City"],
            "State": firstData["State"],
            "Zip": firstData["Zip"],
            "Risk": firstData["Risk"],
            "Results": firstData["Results"],
            "Latitude": firstData["Latitude"],
            "Longitude": firstData["Longitude"],
            "Location": firstData["Location"],
            "InspectionViolations": firstData["Violations"],
            "YelpRating": "",
            "YelpReviewCount": -1,
            "SearchCompleted": true,
        };
        console.log(output);
        response.json(output);
        response.end();
    });
};

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});