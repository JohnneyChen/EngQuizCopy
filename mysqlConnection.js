const mysql = require('mysql');

const connection = mysql.createPool(process.env.CLEARDB_DATABASE_URL)

module.exports = connection