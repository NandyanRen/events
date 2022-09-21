const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

router.route("/")
    .get(userController.getAllUsers)
    .post(userController.createNewUser)

router
    .route('/:id')
    .get(userController.getUserById)
    .put((req, res) => {
        req.params.id
        res.send(`Update Get With ID ${req.params.id}`)
    })
    .delete((req, res) => {
        req.params.id
        res.send(`Delete Get With ID ${req.params.id}`)
    })

    const users = [{name: "Kyle"}, {name: "Sally"}]

    // router.param("id", (req, res, next, id) => {
    //     req.user = users[id]
    //     next()
    // })

module.exports = router