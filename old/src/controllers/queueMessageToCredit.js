import { creditQueue } from "../queue/messagesQueue.js"
import saveMessage from "../clients/saveMessage.js";

export default async (req, res) => {

    console.log("input message is", req.body)
    const message = await saveMessage({
        ...req.body,
        status: "QUEUED",
        messageId: Math.floor(Math.random() * 99999999)
    });
    console.log("QUEUED message is", message)
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
