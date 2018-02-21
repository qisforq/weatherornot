const Sequelize = require('sequelize');
const mysql = require('mysql2'); // Is this required to be required?

let dbOptions = { dialect: 'mysql', host: 'localhost', port: 8080 };
if (process.env.PORT) {
  dbOptions = 'Something else'; // need to find hosted (mlabs like solution for mysql)
}

const sequelize = new Sequelize('weather', 'jonson', null, dbOptions);

sequelize.authenticate().then((err) => {
  if (err) {
    console.log('There is connection in ERROR');
  } else {
    console.log('Connection has been established successfully');
  }
});

exports.Commute = sequelize.define('commute', {
  id: { type: Sequelize.UUID, primaryKey: true },
  name: Sequelize.STRING,
  time: Sequelize.INTEGER,
  a_or_d: Sequelize.STRING(1),
  // origin
  // dest
});

<<<<<<< HEAD
exports.Place = sequelize.define('place', {
  name: Sequelize.STRING(10),
  lat: Sequelize.STRING,
  lng: Sequelize.STRING,
  // icon
});

exports.User = sequelize.define('user', {
  id: { type: Sequelize.UUID, primaryKey: true },
  name: Sequelize.STRING,
  // password
});

//Some issue with foreign keys
// exports.Commute.belongsTo('place', { as: 'origin' });
// exports.Commute.belongsTo('place', { as: 'dest' });
// exports.Commute.belongsTo('user', { as: 'user' });
// exports.Place.belongsTo('user', { as: 'user' });
=======
var Place = sequelize.define('place', {

})

var User = sequelize.define('user', {
  // incrementing id number
  // name
  // password (plain text)
})

Commute.belongsTo('place', {as: 'origin'})
Commute.belongsTo('place', {as: 'dest'})
Commute.belongsTo('user', {as: 'user'})
Place.belongsTo('user', {as: 'user'})
>>>>>>> a few lines
