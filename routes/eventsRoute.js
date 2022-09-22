const express = require("express")
const router = express.Router()
const eventController = require("../controllers/eventController")

router.route("/")
    .get(eventController.getAllEvents)
    .post(eventController.createNewEvent)

router
    .route('/:id')
    .get(eventController.getEventById)
    .post(eventController.update)
    .delete(eventController.destroy)

module.exports = router