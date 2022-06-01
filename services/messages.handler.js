const axios = require("axios");

class MessagesService {
    constructor() {
        this.api = axios.create({
            baseURL: `http://messageapp:3000/`,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
    sendMessage = ({destination, body}) => {
        
        return this.api.post(`message`, {destination, body})
    }
}

const messagesService = new MessagesService()
module.exports = messagesService