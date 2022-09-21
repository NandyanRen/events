const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'glyph_exam'
})


// connection.connect(function(error){
//     if(error){
//         throw error;
//     }
//     else{
//         console.log("Database connection success")
//     }
// })

// connection.query("Select * FROM users", (err, rows, fields) => {
//     if (err) throw err
//     console.log(rows[0])
// })

connection.end()