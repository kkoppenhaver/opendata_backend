var http = require("http");
var express = require('express');
var config = require('getConfig');
var app = express();
var request = require("request");

app.get('/get-restaurant', function(req, res){
  data = { "name ": req.query.name, "price": req.query.zipcode };
  res.json(data);
  res.end();
});

app.get('/get-opendata', function (req, res) {
    dataIn = { "name": req.query.name, "zip": req.query.zip };
    getOpenData(dataIn.name, dataIn.zip, res);
});

var getOpenData = function (name, zip, response) {
    var url = config.openData.url + "collections/restaurants?q={ \"DBA Name\": " + name + ", Zip: " + zip + "}&apiKey=" + config.openData.apiKey;
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