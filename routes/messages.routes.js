const router = require("express").Router()
const messagesAPIService = require("../services/messagesAPI.handler.js")
const messagesDBService = require("../services/messagesDB.handler.js")
const testSendMessageRequest = require("../utils/testSendMessageRequest")

router.get("/hello-world", (req, res) => {

    res.json("hello world")
})

router.post("/messages", (req, res) => {

    const { hasFailed, status, resMessage } = testSendMessageRequest(req.body)
    if (hasFailed) res.status(status).json({ resMsg: resMessage })
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
                                res.status(200).json({resMsg: "Message sent, db success"})
                            })
                            .catch(err => {
                                res.status(200).json({ resMsg: "Message sent, db failed"})
                            })
                    })
                    .catch(err => {
                        console.log("err is", err.response.status)
                        if (err.response.status === 504) {
                            messagesDBService.updateMessageState(messageId, "SENT-UNCONFIRMED")
                                .then(() => {
                                    res.status(200).json({ resMsg: "Message sent unconfirmed, db success"})
                                })
                                .catch(() => {
                                    res.status(200).json({ resMsg: "Message sent unconfirmed, db failed"})
                                })
                        }
                        else {
                            res.status(500).json({ resMsg: "Message could not be sent"})
                        }
                    })
            })
            .catch(() => {
                res.status(500).json({ resMsg: "Message could not be sent" })
            })
    }
})

router.get("/messages", (req, res) => {

    messagesDBService.getMessages()
        .then((messages) => res.status(200).json(messages))
        .catch((err) => res.status(500).json(err))
})

module.exports = router