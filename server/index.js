var express = require('express');
var bodyParser = require('body-parser');
var axios = require('axios')
var geocoder = require('google-geocoder');
// var items = require('../database-mysql');
var app = express();
var apiHelpers = require('./apiHelpers.js')
app.use(bodyParser.json())
app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../client/dist`));


// GET REQUEST TO GOOGLEMAPS API FOR LAT/LONG/ ORIGIN/DESTINATION AND DISTANCE/TIME
app.get('/search', (req, res) => {
  const rootURL = 'https://maps.googleapis.com/maps/api/directions/json?origin=';
  const origin = 'Hack Reactor NY';
  const destination = 'Grand Central';
  const URL = `${rootURL + origin}&destination=${destination}&key=${apiHelpers.googleMapsAPI}`;

  axios.get(URL).then((data) => {
    console.log(data.data);
    console.log('MapsAPI', data.data);
    // res.send(data.data)
    res.status(200).json(data.data);
  });
});


// GET REQUEST TO DARK SKY API, IF NO LATITUDE OR LONGITUDE, RETURN PRESET
app.get('/weather', (req, res) => {
  const rootUrl = 'https://api.darksky.net/forecast';
  const APIKey = apiHelpers.darkSkyAPI;
  const lat = req.lat || '40.750487';
  const long = req.lng || '-73.976401';
  const requestUrl = `${rootUrl}/${APIKey}/${lat},${long}`;

  axios.get(requestUrl)
    .then((data) => {
      res.status(200).json(data.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

 
var geo = geocoder({
  key: apiHelpers.geocodeAPI
});
 
geo.find('223 Edenbridge Dr, Toronto', function(err, res){
	console.log(res)
	console.log(err)
  // process response object 
});


app.get('/items', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(8080, () => {
  console.log('listening on port 8080!');
});

