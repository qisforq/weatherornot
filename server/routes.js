const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
const apiHelpers = require('./apiHelpers.js');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../client/dist')

//Users
app.post('/users', (req, res) => {

})

app.get('/users'), (req,res) => {

})


//Commutes
app.post('/commutes', (req, res) => {

})

app.get('/commutes'), (req,res) => {

})

app.delete('/commutes'), (req,res) => {

})


//Places
app.post('/places', (req, res) => {

})

app.get('/places'), (req,res) => {

})

app.delete('/places'), (req,res) => {

})


//Timeline
app.get('/timeline'), (req,res) => {

})


//Status
app.get('/status'), (req,res) => {

})