const Message = require("../models/Message.model")

class MessagesDBService {
    constructor() {
    }

    saveMessage = (destination, message, number) => {
        return Message.create({destination, message, number})
    }

    updateMessageState = (id, newState) => {
        return Message.findByIdAndUpdate(id, {state: newState})
    }

    getMessages = () => {
        return Message.find()
    }

    deleteAllMessages = () => {
        return Message.remove()
    }

}

const messagesDBService = new MessagesDBService()
module.exports = messagesDBService