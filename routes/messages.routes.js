const router = require("express").Router()
const messagesService = require("../services/messagesAPI.handler.js")
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

            messagesService
                .sendMessage({ destination, message })
                .then(response => {
                    if (response.status === 200) {
                        // res.status(200).json("Message sent")
                        messagesDBService.saveMessage(newMessage)
                            .then(dbResponse => {
                                res.status(200).json("Message sent, db success")
                            })
                            .catch(err => {
                                res.status(200).json("Message sent, db failed")
                            })
                    }
                })
                .catch(err => {
                    if (err.status === 408) {
                        // res.status(408).json({ message: "Message sent but not confirmed", errMsg: err })
                        messagesDBService.saveMessage(newMessage)
                            .then(dbResponse => {
                                res.status(408).json("Message sent but not confirmed, db success")
                            })
                            .catch(err => {
                                res.status(408).json("Message sent but not confirmed, db failed")
                            })
                    }
                    else {
                        // res.status(500).json({ message: "The message could not be sent", errMsg: err })
                        messagesDBService.saveMessage(newMessage)
                            .then(dbResponse => {
                                res.status(500).json("Message not sent, db success")
                            })
                            .catch(err => {
                                res.status(500).json("Message not sent, db failed")
                            })
                    }
                })
        }
    }
})

router.get("/messages", (req, res) => {

    messagesDBService.getMessages()
        .then((messages) => res.status(200).json(messages))
        .catch((err) => res.status(500).json(err))
})

router.post("/create-message", (req, res) => {
    const newMessage = { destination: "holi", message: "holo", number: 3 }

    Message.create(newMessage)
        .then((response) => res.status(200).json(response))
        .catch((err) => res.status(500).json(err))
})


module.exports = router

                // .then((message) => {
                //     res.status(200).json("Message sent")
                // })