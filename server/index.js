const express = require('express');
const bodyParser = require('body-parser');
const api = require('./apiHelpers.js');
const path = require('path');
const { db } = require('../db/mysql.js');
const config = require('./config.js');
const geocoder = require('google-geocoder')({
  key: process.env.GEOCODE_KEY || config.geocodeAPI,
});

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../client/dist')));

/*
  _   _
 | | | |___  ___ _ __ ___
 | | | / __|/ _ \ '__/ __|
 | |_| \__ \  __/ |  \__ \
  \___/|___/\___|_|  |___/

*/
app.post('/users', (req, res) => {
  const { username } = req.body;

  // check if user exists
  db.query(`SELECT * FROM users WHERE username="${username}"`, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send();
      return;
    }

    // if it does not exist add to db
    if (!results.length) {
      db.query(`INSERT INTO users (username) VALUES ("${username}");`, (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send();
          return;
        }
        res.send('Added new user');
      });
    } else {
      res.status(200).send('USER ALREADY EXISTS');
    }
  });
});

/*
   ____                                _
  / ___|___  _ __ ___  _ __ ___  _   _| |_ ___  ___
 | |   / _ \| '_ ` _ \| '_ ` _ \| | | | __/ _ \/ __|
 | |__| (_) | | | | | | | | | | | |_| | ||  __/\__ \
  \____\___/|_| |_| |_|_| |_| |_|\__,_|\__\___||___/

*/
app.post('/commutes', (req, res) => {
  const {
    org, dest,
    aOrD, name,
    time, username,
  } = req.body;


  const unQuery = `SELECT id FROM users WHERE username="${username}"`;

  const query = `INSERT INTO commutes (origin, destination, arriveordepart, name, time, username)
                 VALUES ((SELECT id FROM places WHERE name="${org}" AND username=(${unQuery})), 
                 (SELECT id FROM places WHERE name="${dest}"
                  AND username=(${unQuery})), "${aOrD}", "${name}", "${time}", (${unQuery}));`;

  db.query(query, (err) => {
    if (err) {
      res.status(500).send();
      return;
    }
    res.send('Posted commute!');
  });
});

app.get('/commutes', (req, res) => {
  const { username } = req.query;

  // get data from commutes table for provided user
  db.query(`SELECT * FROM commutes WHERE username=(SELECT id FROM users WHERE username="${username}")`, (err, commutes) => {
    // get lng and lat for each place
    Promise.all(commutes.map(commute => new Promise((resolve) => {
      db.query(`SELECT * FROM places WHERE id=${commute.origin}`, (err, ori) => {
        db.query(`SELECT * FROM places WHERE id=${commute.destination}`, (err, dest) => {
          // add those values to each commutes object
          resolve(Object.assign(commute, { origin: ori[0], destination: dest[0] }));
        });
      });
    })))
      .then((commutesWithCords) => {
        // run those commute objects through the api.getTravelTime helper function
        return Promise.all(commutesWithCords.map((commute => api.getTravelTime(commute)
          .then(commuteWithTravelTime => commuteWithTravelTime))));
        // add travel time to commute object
      })
      .catch((errorMsg) => {
        res.status(500).send('somethign went wrong', errorMsg);
      })
      .then((data) => {
        // send back in response
        res.send(data);
      });
  });
});

app.delete('/commutes', (req, res) => {
  const commuteId = JSON.parse(req.query.commuteId).id;
  db.query(`DELETE FROM commutes WHERE id="${commuteId}"`, (err) => {
    if (err) {
      res.status(500).send();
      return;
    }
    res.status(200).send();
  });
});

/*
  ____  _
 |  _ \| | __ _  ___ ___  ___
 | |_) | |/ _` |/ __/ _ \/ __|
 |  __/| | (_| | (_|  __/\__ \
 |_|   |_|\__,_|\___\___||___/

*/
app.post('/places', (req, res) => {

  let {
    address, placeType,
    lat, lng, username,
  } = req.body;

  // Check if place already exists with the passed in place name
  db.query(`SELECT * FROM places WHERE name="${placeType}" 
            AND username=(SELECT username FROM users WHERE id="${username}");`, (err, result) => {
              
    if (err) {
      console.log(err)
      res.status(500).send();
      return;
    }

    if (result.length > 0) {
      console.log('place exists with that name for the user', username);
      res.status(200).send('place already exists');
      return;
    }

    // Get the lng and lat for the passed in address
    geocoder.find(address, (err, geoData) => {
      if (err) {
        res.status(200).send('Sorry, the address you submitted is not valid');
        return;
      }

      // If the client has not provided lng and lat, reassign using geocoder API lng and lat
      if (geoData !== undefined) {
        if (!lng & !lat) {
          lat = geoData[0].location.lat;
          lng = geoData[0].location.lng;
        }
      }

      // add place
      const unQuery = `SELECT id FROM users WHERE username="${username}"`;
      const query = `INSERT INTO places (name, latitude, longitude, username) 
                    VALUES ("${placeType}", "${lat}", "${lng}", (${unQuery}));`;
                    
      db.query(query, (err) => {
        if (err) {
          console.log(err);
          res.status(500).send();
          return;
        }
        res.send('added place to db');
      });
    });
  });
});


app.get('/places', (req, res) => {
  const { username } = req.query;

  // Get places for a specified user
  db.query(`SELECT * FROM places WHERE username=(SELECT id FROM users WHERE username="${username}");`, (err, results) => {
    if (err) {
      res.status(500).send();
      return;
    }

    // Attach the current day's weather data from api onto the place object
    Promise.all(results.map(place => api.getWeather(place).then(placeWithWeath => placeWithWeath)))
      .then((data) => {
        console.log('places get request', data)
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send();
      });
  });
});


app.delete('/places', (req, res) => {
  const placeId = JSON.parse(req.query.place).id
  // find all commutes that contain this place and delete them
  db.query(`DELETE FROM commutes WHERE origin=${placeId} OR destination=${placeId}`, (err) => {
    if (err) {
      res.status(500).send();
      return;
    }
    // delete place
    db.query(`DELETE FROM places WHERE id=${placeId}`, (err) => {
      if (err) {
        res.status(500).send();
        return;
      }
      console.log('deleted places')
      res.status(200).send();
    });
  });
});

var PORT = 8080

if (process.env.PORT) {
  PORT = process.env.PORT
}

app.listen(PORT, () => {
  console.log('listening on port 8080!');
});
