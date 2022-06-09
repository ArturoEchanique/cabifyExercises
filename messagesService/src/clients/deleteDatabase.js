import { Message } from "../models/message.js";
import { RepMessage } from "../models/message.js";

export default async () => {

    try {
        await Message.remove()
        await RepMessage.remove()
        console.log("messages database deleted")
        return true
    }
    catch {
        console.log("could not delete database")
        return false
    }
}
