const router = require("express").Router()
const messagesService = require("../services/messages.handler.js")
const checkIfEmpty = require("../utils/checkIfEmpty")


router.get("/hello-world", (req, res) => {

    res.json("hello world")
})

router.post("/messages", (req, res) => {


    if (!('destination' in req.body)) {
        res.status(400).json({ message: 'Destination key is required' })
    }
    else if (!('message' in req.body)) {
        res.status(400).json({ message: 'Message key is required' })
    }

    else {

        const { destination, message } = req.body
        
        if (checkIfEmpty(destination) && checkIfEmpty(message)) {
            res.status(422).json({ message: 'Destination and message fields are required' })
        } else if (checkIfEmpty(destination)) {
            res.status(422).json({ message: 'Destination field is required' })
        } else if (checkIfEmpty(message)) {
            res.status(422).json({ message: 'Message field is required' })
        } else if (Object.keys(req.body).length > 2) {
            res.status(413).json({ message: 'Payload must not contain keys different to _destination_ and _message_' })
        } else {
            messagesService
                .sendMessage({ destination, message })
                .then(response => { res.status(200).json({ message: "Message sent", response: response.data }) })
                .catch(err => res.status(500).json({ message: "The message could not be sent" }))
        }
    }
})


module.exports = router