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
    sendMessage = ({destination, message}) => {
        return this.api.post(`message`, {destination, body:message})
    }
    
}

const messagesService = new MessagesService()
module.exports = messagesService