const router = require("express").Router()
const messagesAPIService = require("../services/messagesAPI.handler.js")
const messagesDBService = require("../services/messagesDB.handler.js")
const checkIfEmpty = require("../utils/checkIfEmpty")
const Message = require("../models/Message.model")


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

        console.log("recbody is", req.body)
        if (checkIfEmpty(destination) && checkIfEmpty(message)) {
            res.status(422).json({ message: 'Destination and message fields are required' })
        } else if (checkIfEmpty(destination)) {
            res.status(422).json({ message: 'Destination field is required' })
        } else if (checkIfEmpty(message)) {
            res.status(422).json({ message: 'Message field is required' })
        } else if (Object.keys(req.body).length > 2) {
            res.status(413).json({ message: 'Payload must not contain keys different to _destination_ and _message_' })
        } else {

            const newMessage = { destination, message, number: 3 }
            messagesDBService.saveMessage(newMessage)
                .then(dbMessage => {
                    const messageId = dbMessage._id
                    messagesAPIService
                        .sendMessage({ destination, message })
                        .then(apiResponse => {
                            messagesDBService.updateMessageState(messageId, "SENT")
                                .then(dbResponse => {
                                    res.status(200).json("Message sent, db success")
                                })
                                .catch(err => {
                                    res.status(200).json("Message sent, db failed")
                                })
                        })
                        .catch(err => {
                            if (err.status === 408) {
                                messagesDBService.updateMessageState(messageId, "SENT-UNCONFIRMED")
                                    .then(dbResponse => {
                                        res.status(200).json("Message sent unconfirmed, db success")
                                    })
                                    .catch(err => {
                                        res.status(200).json("Message sent unconfirmed, db failed")
                                    })
                            }
                            else {
                                res.status(500).json("Message could not be sent")
                            }
                        })
                })
                .catch(err => {
                    res.status(500).json("Message could not be sent")
                })
        }
    }
})

router.get("/messages", (req, res) => {

    messagesDBService.getMessages()
        .then((messages) => res.status(200).json(messages))
        .catch((err) => res.status(500).json(err))
})

module.exports = router