var db = require('../config/db')

class Event {
    constructor(name, start_date, end_date) {
        this.name = name
        this.start_date = start_date
        this.end_date = end_date
    }

    save() {
        // const d = new Date();
        // let yyy = d.getFullYear();
        // let mm = d.getMonth() + 1;
        // let dd = d.getDate();

        // let time = d.getTime();

        // let createdAtDate = `${yyyy}-${mm}-${dd} ${time}`;

        let sql =
            `INSERT INTO events (name, start_date, end_date)
            VALUES ('${this.name}', '${this.start_date}', '${this.end_date}')`
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
        console.log("entered update")
        let sql = `UPDATE events
        SET name = '${this.name}', start_date = '${this.start_date}', end_date = '${this.end_date}'
        WHERE id = ${id};`
        return db.execute(sql);
    }

    static destroy(id){
        let sql = `DELETE FROM events WHERE id = ${id};`
        return db.execute(sql);
    }

}

module.exports = Event