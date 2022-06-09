import saveMessage from "../clients/saveMessage.js";
import checkHasBudget from "../clients/checkHasBudget.js";
import { messagesQueue } from "../queue/messagesQueue.js"

export default async (req, res) => {

    try {
        if (await checkHasBudget()) {
            console.log("there is enought budget")
            const message = await saveMessage({
                ...req.body,
                status: "QUEUED",
            });
            queue.add(message)
            res.statusCode = 200;
            res.end(`processing message`);
        }
        else {
            throw { message: "there is NOT enought budget" }
        }
    }
    catch (err) {
        res.statusCode = 500;
        res.end(JSON.stringify(err));
    }
}
