const Sequelize = require('sequelize')
const path = require('path')
const mysql = require('mysql')

var dbOptions = { dialect: 'mysql', host: 'localhost', port: 8080 }
if (process.env.PORT) {
  dbOptions = 'Something else' //need to find hosted (mlabs like solution for mysql)
};

const sequelize = new Sequelize('weather', 'jonson', null, dbOptions)

sequelize.authenticate().complete(function (err) {
  if (err) {
     console.log('There is connection in ERROR');
  } else {
     console.log('Connection has been established successfully');
  }
 });

var Commute = sequelize.define('Commute', {
  id: {type: Sequelize.UUID, primaryKey: true},
  name: Sequelize.STRING,
  time: Sequelize.INTEGER,
a_or_d: {type: Sequelize.STRING, }
  // origin
  // dest
})

Commute.belongsTo('User', {as: 'User'})