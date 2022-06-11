import { Message } from "../models/message.js";
import { RepMessage } from "../models/message.js";
export default async (id) => {

    try {
        const message = await Message.findById(id).select("status")
        return message.status
    }
    catch {
        const repMessage = await RepMessage.findById(id).select("status")
        return repMessage.status
    }
}
