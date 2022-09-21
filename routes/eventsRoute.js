const express = require("express")
const router = express.Router()
const eventController = require("../controllers/eventController")

router.route("/")
    .get(eventController.getAllEvents)
    .post(eventController.createNewEvent)

router
    .route('/:id')
    .get(eventController.getEventById)
    // .put((req, res) => {
    //     req.params.id
    //     res.send(`Update Get With ID ${req.params.id}`)
    // })
    // .delete((req, res) => {
    //     req.params.id
    //     res.send(`Delete Get With ID ${req.params.id}`)
    // })

module.exports = router