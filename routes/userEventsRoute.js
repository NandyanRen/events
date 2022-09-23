const express = require("express")
const router = express.Router()
const userEventController = require("../controllers/userEventController")

router.route("/")
    .post(userEventController.createNewUserEvent)

router.route("/:id")
    .get(userEventController.findUserEventById)
    // .post(userEventController.addUsers)
    .delete(userEventController.destroy)

module.exports = router