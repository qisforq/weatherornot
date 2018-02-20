var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios')
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
// var items = require('../database-mongo');
var app = express();
var googleMapsAPI = require('./googleMapsAPI.js')
app.use(bodyParser.json())
app.use(express.static(__dirname + '/../react-client/dist'));



//GET REQUEST TO GOOGLEMAPS API FOR LAT/LONG/ ORIGIN/DESTINATION AND DISTANCE/TIME
app.get('/search', function(req,res){
	let rootURL = 'https://maps.googleapis.com/maps/api/directions/json?origin='
	let origin = 'Hack Reactor NY'
	let destination = 'Grand Central'
	let URL = rootURL + origin + '&destination=' + destination + '&key=' + googleMapsAPI.googleMapsAPI

	axios.get(URL).then((data) => {
		console.log(data.data)
      console.log('MapsAPI',data.data)
      // res.send(data.data)
      res.status(200).json(data.data);

     })
})


//GET REQUEST TO DARK SKY API, IF NO LATITUDE OR LONGITUDE, RETURN PRESET
app.get('/weather', function(req,res){
	let rootUrl = 'https://api.darksky.net/forecast'
	let APIKey = '1dc4337362add083bf9483261045a0c0'
	let lat = req.lat || '40.750487' 
 	let long =  req.lng  || '-73.976401'
 	let requestUrl = rootUrl + '/' + APIKey + '/' + lat + ',' + long;

  	axios.get(requestUrl)
	   .then(function(data) {
	     res.status(200).json(data.data);
	   })
	   .catch(function(error) {
	     console.log(error);
    })
})

app.get('/items', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(8080, function() {
  console.log('listening on port 3000!');
});

