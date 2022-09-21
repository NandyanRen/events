const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'glyph_exam'
})

connection.connect(function(error){
    if(error){
        throw error;
    }
    else{
        console.log("Database connection success")
    }
})

connection.end()