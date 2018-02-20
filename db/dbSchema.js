const Sequelize = require('sequelize')
const path = require('path')

var dbOptions = {}
if (process.env.PORT) {
  dbOptions = ''
};

const sequelize = new Sequelize('weather', dbOptions)
