var db = require('../config/db')

class Event {
    constructor(title, start_time, end_time) {
        this.title = title
        this.start_time = start_time
        this.end_time = end_time
    }

    save() {
        let sql =
            `INSERT INTO events (title, start_time, end_time)
            VALUES ('${this.title}', '${this.start_time}', '${this.end_time}')`
        return db.execute(sql)
    }

    static findAll(){
        let sql = "SELECT * FROM events;"
        return db.execute(sql)
    }

    static findById(id){
        let sql = `SELECT * FROM events WHERE id = ${id};`
        return db.execute(sql);
    }
    
    update(id){
        let sql = `UPDATE events
        SET title = '${this.title}', start_time = '${this.start_time}', end_time = '${this.end_time}'
        WHERE id = ${id};`
        return db.execute(sql);
    }

    static destroy(id){
        let sql = `DELETE FROM events WHERE id = ${id};`
        return db.execute(sql);
    }

}

module.exports = Event