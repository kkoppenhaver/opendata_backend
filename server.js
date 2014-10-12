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

app.get('/get-restaurant', function (req, res) {
    console.log('testing stuff');
    dataIn = { "name": req.query.name, "zip": req.query.zipcode };
    console.log(dataIn);
    console.log('calling open data function');
    getOpenData(dataIn.name, dataIn.zip, res);
  //data = { "name": req.query.name, "zipcode": req.query.zipcode, "searchCompleted": true };
  //res.json(data);
  //res.end();
});

app.get('/get-opendata', function (req, res) {
    console.log('testing stuff');
    dataIn = { "name": req.query.name, "zip": req.query.zipcode };
    console.log(dataIn);
    console.log('calling open data function');
    getOpenData(dataIn.name, dataIn.zip, res);
});

var getOpenData = function (name, zip, response) {
    openDataUrl = process.env.openDataUrl ||  config.openData.url;
    apiKey = process.env.openDataApiKey || config.openData.apiKey;
    console.log("Input Name:" + name);
    console.log("Input Zip:" + zip);
    var url = (process.env.openDataUrl || config.openData.url) + "collections/restaurants?q={ \"DBA Name\": \"" + (name || "") + "\", Zip: " + (zip || 00000) + "}&apiKey=" + (config.openData.apiKey || process.env.openDataApiKey);
    console.log("URL: " + url);
    var openDataResults;
    request.get(url, function (e, r, openDataResults) {
        var data = JSON.parse(openDataResults);
        var firstData = data[0];

        if (firstData) {
            var output =
            {
                "name": firstData["DBA Name"],
                "address1": firstData["Address"],
                "city": firstData["City"],
                "state": firstData["State"],
                "zipcode": firstData["Zip"],
                "risk": firstData["Risk"],
                "results": firstData["Results"],
                "latitude": firstData["Latitude"],
                "longitude": firstData["Longitude"],
                "location": firstData["Location"],
                "inspectionViolations": firstData["Violations"],
                "yelpRating": "",
                "yelpReviewCount": -1,
                "searchCompleted": true,
            };
            console.log(output);
            response.json(output);
        }
        else
        {
            var output =
            {
                "inputname": name,
                "inputzip": zip,
                "errorMessage": "No results found. No double quotes in input name",
            };
        }
        response.end();
    });
};

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});