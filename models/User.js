var db = require('../config/db')

class User {
    constructor(name) {
        this.name = name
    }

    save() {
        let sql =
            `INSERT INTO users (name)
            VALUES ('${this.name}')`
        return db.execute(sql)
    }

    static findAll(){
        let sql = "SELECT * FROM users;"
        return db.execute(sql)
    }

    static findById(id){
        let sql = `SELECT * FROM users WHERE id = ${id};`
        return db.execute(sql);
    }

    static findByName(name){
        let sql = `SELECT * FROM users WHERE name LIKE '${name}';`
        return db.execute(sql);
    }

}

module.exports = User