const express = require("express")
const router = express.Router()
var database = require('../database')

router.get("/", (req, res) => {
    res.send("User List")
})

router.get("/new", (req, res) => {
    res.send("User New Form")
})

router.post('/', (req, res) => {
    res.send('Create user')
})

router
    .route('/:id')
    .get((req, res) => {
    req.params.id
    console.log(req.user)
        res.send(`User Get With ID ${req.params.id}`)
    })
    .put((req, res) => {
        req.params.id
        res.send(`Update Get With ID ${req.params.id}`)
    })
    .delete((req, res) => {
        req.params.id
        res.send(`Delete Get With ID ${req.params.id}`)
    })

    const users = [{name: "Kyle"}, {name: "Sally"}]

    router.param("id", (req, res, next, id) => {
        req.user = users[id]
        next()
    })

module.exports = router