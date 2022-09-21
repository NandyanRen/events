const mysql = require('mysql2')
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'glyph_exam'
})


module.exports = pool.promise();