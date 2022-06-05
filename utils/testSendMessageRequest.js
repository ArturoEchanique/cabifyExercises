const checkIfEmpty = require("./checkIfEmpty")

const testSendMessageRequest = (request) => {

    let hasFailed = false
    let status = 200
    let resMessage = "Message sent"

    if (!('destination' in request)) {
        hasFailed = true
        status = 400
        resMessage = 'Destination key is required'
    }
    else if (!('message' in request)) {
        hasFailed = true
        status = 400
        resMessage = 'Message key is required'
    }
    else {
        const { destination, message } = request
        if (checkIfEmpty(destination) && checkIfEmpty(message)) {
            hasFailed = true
            status = 422
            resMessage = 'Destination and message fields are required'
        } else if (checkIfEmpty(destination)) {
            hasFailed = true
            status = 422
            resMessage = 'Destination field is required'
        } else if (checkIfEmpty(message)) {
            hasFailed = true
            status = 422
            resMessage = 'Message field is required'
        } else if (Object.keys(request).length > 2) {
            hasFailed = true
            status = 413
            resMessage = 'Payload must not contain keys different to _destination_ and _message_'
        }
    }
    return { hasFailed, status, resMessage }
}


module.exports = testSendMessageRequest