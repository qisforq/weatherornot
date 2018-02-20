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

var Commute = sequelize.define('commute', {
  id: {type: Sequelize.UUID, primaryKey: true},
  name: Sequelize.STRING,
  time: Sequelize.INTEGER,
  a_or_d: Sequelize.STRING(1)
  // origin
  // dest
})

var Place = sequelize.define('place', {
  
})

var User = sequelize.define('user', {

})

Commute.belongsTo('place', {as: 'origin'})
Commute.belongsTo('place', {as: 'dest'})
Commute.belongsTo('user', {as: 'user'})
Place.belongsTo('user', {as: 'user'})
