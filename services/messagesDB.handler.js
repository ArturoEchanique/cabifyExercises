const Message = require("../models/Message.model")

class MessagesDBService {
    constructor() {
    }

    saveMessage = (newMessage) => {
        return Message.create(newMessage)
    }

    updateMessageState = (id, newState) => {
        return Message.findByIdAndUpdate(id, {state: newState})
    }

    getMessages = () => {
        return Message.find()
    }

}

const messagesDBService = new MessagesDBService()
module.exports = messagesDBService