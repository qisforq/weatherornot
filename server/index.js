const express = require('express');
const bodyParser = require('body-parser');
const api = require('./apiHelpers.js');
const path = require('path');
const { db } = require('../db/mysql.js');
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
  // expecting body: {username: USERNAME}
  const { username } = req.body;

  // check if user exists
  db.query(`SELECT * FROM users WHERE username="${username}"`, (err, results) => {
    if (err) {
      console.log(err);
      res.send('error');
      return;
    }
    if (!results.length) {
      db.query(`INSERT INTO users (username) VALUES ("${username}");`, (err, results) => {
        if (err) {
          console.log(err);
          res.send('error');
          return;
        }
        res.send('Added new user');
      });
    } else {
      res.status(500).send('USER EXISTS');
    }
  });
});

app.get('/users', (req, res) => {
  // Will send back all of user's data... do this later
});


// Commutes
app.post('/commutes', (req, res) => {
  const {
    org, dest,
    aOrD, name,
    time, username,
  } = req.body;

  const unQuery = `SELECT id FROM users WHERE username="${username}"`;
  const query = `INSERT INTO commutes (origin, destination, arriveordepart, name, time, username) VALUES ("${org.id}", "${dest.id}", "${aOrD}", "${name}", "${time}", (${unQuery}));`;
  db.query(query, (err) => {
    if (err) {
      console.log(err);
      res.send('IT BROKE');
      return;
    }
    res.send('Posted commute!');
  });
});

app.get('/commutes', (req, res) => {

});

app.delete('/commutes', (req, res) => {

});


// Places
app.post('/places', (req, res) => {
  // req.body = {address, placeType, lat, lng}
  console.log(req.body);

  let {
    address,
    placeType,
    lat,
    lng,
    username,
  } = req.body;

  console.log('POST place');
  db.query(`SELECT * FROM places WHERE name="${placeType}";`, (err, result) => {
    if (err) {
      res.status(500).send();
      return;
    }

    if (result.length) {
      console.log('place exists with that name');
      res.status(400).send('place already exists');
      return;
    }

    geocoder.find(address, (err, geoData) => {
      console.log('geocoder works');

      if (err) {
        res.status(400).send('Sorry, the address you submitted is not valid');
        return;
      }

      if (geoData !== undefined) {
        if (!lng & !lat) {
          lat = geoData[0].location.lat;
          lng = geoData[0].location.lng;
        }
      }

      const unQuery = `SELECT id FROM users WHERE username="${username}"`;
      const query = `INSERT INTO places (name, latitude, longitude, username) VALUES ("${placeType}", "${lat}", "${lng}", (${unQuery}));`;
      db.query(query, (err) => {
        if (err) {
          console.log(err);
          res.status(500).send('error');
          return;
        }
        res.send('added place to db');
        return
      });
    });
  });
});


app.get('/places', (req, res) => {
  const { username } = req.query;

  db.query(`SELECT * FROM places WHERE username=(SELECT id FROM users WHERE username="${username}");`, (err, results) => {
    if (err) {
      res.status(500).send();
      return;
    }

    Promise.all(results.map((place)=> {
      return api.getWeather(place).then(placeWithWeath => placeWithWeath);
    }))
    .then((data)=> {
      res.send(data)
    })
    .catch((err)=> {
      console.log(err)
      res.status(500).send()
    })
  });
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
