var db = require('../config/db')

class UserEvent {
    constructor(userId, eventId) {
        this.userId = userId
        this.eventId = eventId
    }

    save() {
        let sql =
            `INSERT INTO user_events (userId, eventId)
            VALUES ('${this.userId}', '${this.eventId}')`
        return db.execute(sql)
    }

    static findById(id){
        let sql = `SELECT * FROM user_events WHERE id = ${id};`
        return db.execute(sql);
    }

    static destroy(id){
        let sql = `DELETE FROM user_events WHERE id = ${id};`
        return db.execute(sql);
    }

}

module.exports = UserEvent