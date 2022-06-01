const router = require("express").Router()
const messagesService = require("../services/messages.handler.js")


router.get("/hello-world", (req, res) => {

    res.json("hello world")
})

router.post("/messages", (req, res) => {

    const {destination, body} = req.body
    messagesService
        .sendMessage({destination, body})
        .then(({data}) => {
            res.status(200).json(data)
        })
        .catch((err) => res.status(500).json({ message: "The service could not store the message", errorData: err }))
})

module.exports = router