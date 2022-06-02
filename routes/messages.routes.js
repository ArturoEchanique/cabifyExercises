const router = require("express").Router()
const messagesAPIService = require("../services/messagesAPI.handler.js")
const messagesDBService = require("../services/messagesDB.handler.js")
const testSendMessageRequest = require("../utils/testSendMessageRequest")

router.get("/hello-world", (req, res) => {

    res.json("hello world")
})

router.post("/messages", (req, res) => {

    const { hasFailed, status, resMessage } = testSendMessageRequest(req.body)
    if (hasFailed) res.status(status).json({ resMessage })
    else {
        const { destination, message } = req.body
        messagesDBService.saveMessage(destination, message, 3)
            .then(dbMessage => {
                const messageId = dbMessage._id
                messagesAPIService
                    .sendMessage({ destination, message })
                    .then(() => {
                        messagesDBService.updateMessageState(messageId, "SENT")
                            .then(() => {
                                res.status(200).json("Message sent, db success")
                            })
                            .catch(err => {
                                res.status(200).json("Message sent, db failed")
                            })
                    })
                    .catch(err => {
                        if (err.status === 408) {
                            messagesDBService.updateMessageState(messageId, "SENT-UNCONFIRMED")
                                .then(() => {
                                    res.status(200).json("Message sent unconfirmed, db success")
                                })
                                .catch(() => {
                                    res.status(200).json("Message sent unconfirmed, db failed")
                                })
                        }
                        else {
                            res.status(500).json("Message could not be sent")
                        }
                    })
            })
            .catch(() => {
                res.status(500).json("Message could not be sent")
            })
    }
})

router.get("/messages", (req, res) => {

    messagesDBService.getMessages()
        .then((messages) => res.status(200).json(messages))
        .catch((err) => res.status(500).json(err))
})

module.exports = router