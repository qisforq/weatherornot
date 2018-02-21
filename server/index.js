let express = require('express');
let bodyParser = require('body-parser');
let api = require('./apiHelpers');
let path = require('path')
let db = require('../db/dbSchema')

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

app.get('/commutes', (req,res) => {

})

app.delete('/commutes', (req,res) => {

})


//Places
app.post('/places', (req, res) => {

})

app.get('/places', (req,res) => {

})

app.delete('/places', (req,res) => {

})


//Timeline
app.get('/timeline', (req,res) => {

})


//Status
app.get('/status', (req,res) => {

})

app.listen(8080, () => {
  console.log('listening on port 8080!');
});