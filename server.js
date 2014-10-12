var http = require("http");
var express = require('express');
var request = require("request");
var string = require("string");
var config = require('getconfig');
var Q = require("q");
var yelp = require("yelp").createClient({
  consumer_key: process.env.consumer_key || config.yelp.consumer_key, 
  consumer_secret: process.env.consumer_secret || config.yelp.consumer_secret,
  token: process.env.token || config.yelp.token,
  token_secret: process.env.token_secret || config.yelp.token_secret
});

var app = express();

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

function getYelpResponseAsync(data) {
    var deferred = Q.defer();

    yelp.search({term: data.name, location: data.zip}, function(error, data) {      
      if (error) {
        deferred.reject(error)
      }

      deferred.resolve(data.businesses[0]);
    });

    return deferred.promise
}

app.get('/get-restaurant', function (req, res) {
    dataIn = { "name": req.query.name, "zip": req.query.zipcode };
    getYelpResponseAsync(dataIn).then(function(data) {
        yelpData = data;
        getOpenData(dataIn.name, dataIn.zip, res, yelpData);
    });
    
  //data = { "name": req.query.name, "zipcode": req.query.zipcode, "searchCompleted": true };
    
});

app.get('/get-opendata', function (req, res) {
    console.log('testing stuff');
    dataIn = { "name": req.query.name, "zip": req.query.zipcode };
    console.log(dataIn);
    console.log('calling open data function');
    getOpenData(dataIn.name, dataIn.zip, res);
});

var getOpenData = function (name, zip, response, yelpData) {
    openDataUrl = process.env.openDataUrl ||  config.openData.url;
    apiKey = process.env.openDataApiKey || config.openData.apiKey;
    console.log("Input Name:" + name);
    console.log("Input Zip:" + zip);
    var url = (process.env.openDataUrl || config.openData.url) + "collections/restaurants?q={\"DBA Name\":\"" + (name || "") + "\", Zip: " + (zip || 00000) + "}&apiKey=" + (config.openData.apiKey || process.env.openDataApiKey);
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
                "yelpRating": yelpData.rating,
                "yelpReviewCount": yelpData.review_count,
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
            console.log(output);
            response.json(output);
        }
        response.end();
    });
};

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});