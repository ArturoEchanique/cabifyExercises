import { creditQueue } from "../queue/messagesQueue.js"

export default async (req, res) => {

    const message = {
        ...req.body,
        messageId: Math.floor(Math.random() * 99999999),
        status: "QUEUED",
    }
    try {
        creditQueue.add(message);
        res.statusCode = 200;
        res.end(`processing message`);
    }
    catch (err) {
        res.statusCode = 500;
        res.end(JSON.stringify(err));
    }
}
