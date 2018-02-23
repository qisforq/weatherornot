const mysql = require('mysql')

if (process.env.PORT) {
  const db = mysql.createConnection({
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password : process.env.RDS_PASSWORD,
    port : process.env.RDS_PORT
  });
} else {
  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'weather',
  });
}

db.connect((err)=> {
	if (err) {
		throw(err)
	} else {
		console.log('db weather connected')
	}
}) 

module.exports = {
  db: db,
};
