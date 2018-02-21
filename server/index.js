let express = require('express');
let bodyParser = require('body-parser');
let api = require('./apiHelpers.js');
let path = require('path')
let db = require('../db/mysql.js')
const config = require('./config.js')
const geocoder = require('google-geocoder')({
  key: config.geocodeAPI
});


// var items = require('../database-mysql');
let app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../client/dist')))

//Users
app.post('/users', (req, res) => {

})

app.get('/users', (req,res) => {

})


//Commutes
app.post('/commutes', (req, res) => {

})

app.get('/commutes', (req, res) => {

})

app.delete('/commutes', (req, res) => {

})


//Places
app.post('/places', (req, res) => {
  console.log("req.body", req.body);
  if (req.body.lat && req.body.lng) {// If autocomplete has the lat and long coordinates, no need to make an api call
    console.log("lat and long!", req.body.lat, req.body.lng);
  } else if (req.body.address) {
    geocoder.find(req.body.address, function(err, geoData){
      console.log('geocoder works');
      let lat = 0;
      let long = 0;
      if (geoData !== undefined) {
        lat = geoData[0].location.lat;
        long = geoData[0].location.lng;
      }
    });
  } else {
    res.status(400).send(`Sorry, the address you submitted is not valid`);
  }
})

app.get('/places', (req, res) => {

})

app.delete('/places', (req, res) => {

})


//Timeline
app.get('/timeline', (req, res) => {

})


//Status
app.get('/status', (req, res) => {

})

app.listen(8080, () => {
  console.log('listening on port 8080!');
});
