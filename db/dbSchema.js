
// --------------------------------------------------------------------------- //

// !!! Ended up not using sequelize, see weather.sql and mysql.js for db files //

// --------------------------------------------------------------------------- //

// const Sequelize = require('sequelize');
// const mysql = require('mysql2'); // Is this required to be required?

// let dbOptions = { dialect: 'postgress', host: 'localhost', port: 8080 };
// if (process.env.PORT) {
//   dbOptions = 'Something else'; // need to find hosted (mlabs like solution for mysql)
// }

// const sequelize = new Sequelize('weather', 'jonson', null, dbOptions);

// sequelize.authenticate().then((err) => {
//   if (err) {
//     console.log('There is connection in ERROR');
//   } else {
//     console.log('Connection has been established successfully');
//   }
// });

// exports.Commute = sequelize.define('commute', {
//   name: Sequelize.STRING,
//   time: Sequelize.INTEGER,
//   a_or_d: Sequelize.STRING(1),
//   // origin
//   origin: {
//     type: Sequelize.INTEGER,

//     references: {
//       // This is a reference to another model
//       model: 'place',

//       // This is the column name of the referenced model
//       key: 'id',

//       // This declares when to check the foreign key constraint. PostgreSQL only.
//       deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
//     },
//   },
//   // dest
//     destination: {
//       type: Sequelize.INTEGER,

//       references: {
//         // This is a reference to another model
//         model: 'place',

//         // This is the column name of the referenced model
//         key: 'id',

//         // This declares when to check the foreign key constraint. PostgreSQL only.
//         deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
//       },
//     },
//     user: {
//       type: Sequelize.INTEGER,

//       references: {
//         // This is a reference to another model
//         model: 'user',

//         // This is the column name of the referenced model
//         key: 'id',

//         // This declares when to check the foreign key constraint. PostgreSQL only.
//         deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
//       },
//     },
// })

// exports.Place = sequelize.define('place', {
//   name: Sequelize.STRING(10),
//   lat: Sequelize.STRING,
//   lng: Sequelize.STRING,
//   // icon
//   user: {
//     type: Sequelize.INTEGER,

//     references: {
//       // This is a reference to another model
//       model: 'user',

//       // This is the column name of the referenced model
//       key: 'id',

//       // This declares when to check the foreign key constraint. PostgreSQL only.
//       deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
//     },
//   },
// });

// exports.User = sequelize.define('user', {
//   name: Sequelize.STRING,
//   // password
// });

//Some issue with foreign keys
// exports.Commute.belongsTo('place', { as: 'origin' });
// exports.Commute.belongsTo('place', { as: 'dest' });
// exports.Commute.belongsTo('user', { as: 'user' });
// exports.Place.belongsTo('user', { as: 'user' });
