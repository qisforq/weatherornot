const express = require('express');
const bodyParser = require('body-parser');
const api = require('./apiHelpers.js');
const path = require('path');
const { db } = require('../db/mysql.js')

// var items = require('../database-mysql');
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../client/dist')));

// if not create user
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

  //get all commutes from db
  //run commutes through google directions
  //

});

app.delete('/commutes', (req, res) => {

});


// Places
app.post('/places', (req, res) => {
 
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
