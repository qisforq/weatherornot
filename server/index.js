const express = require('express');
const bodyParser = require('body-parser');
const api = require('./apiHelpers.js');
const path = require('path');
const db = require('../db/mysql.js');
const config = require('./config.js');
const geocoder = require('google-geocoder')({
  key: config.geocodeAPI,
});


// var items = require('../database-mysql');
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../client/dist')));

// Users
app.post('/users', (req, res) => {

});

app.get('/users', (req, res) => {

});


// Commutes
app.post('/commutes', (req, res) => {

});

app.get('/commutes', (req, res) => {

});

app.delete('/commutes', (req, res) => {

});


// Places
app.post('/places', (req, res) => {
  // req.body = {address, placeType, lat, lng}

  // if name of place exists, send back error

  const {address, placeType, lat, lng} = req.body

  

  console.log('req.body', req.body);
  if (lat && lng) {
    const query = `INSERT INTO places (name, latitude, longitude, username) VALUES ("${placeType}", "${lat}", "${lng}", "${unQuery}")`
    db.query(query, () => {

    })
  } else if (address) {
    geocoder.find(address, (err, geoData) => {
      console.log('geocoder works');
      if (geoData !== undefined) {
        lat = geoData[0].location.lat;
        lng = geoData[0].location.lng;
      }
    });
  } else {
    res.status(400).send('Sorry, the address you submitted is not valid');
  }
});

app.get('/places', (req, res) => {

});

app.delete('/places', (req, res) => {

});


// Timeline
app.get('/timeline', (req, res) => {

});


// Status
app.get('/status', (req, res) => {

});

app.listen(8080, () => {
  console.log('listening on port 8080!');
});
