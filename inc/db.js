const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'user',
  database: 'saboroso',
  password: 'Saboroso10.'
})

module.exports = connection;