import { Message } from "../models/message.js";
import { RepMessage } from "../models/message.js";
import { Budget } from "../models/budget.js";
import { RepBudget } from "../models/budget.js";

export default async () => {

    try {
        await Message.remove()
        await RepMessage.remove()
        await Budget.remove()
        await RepBudget.remove()
        console.log("database deleted")
        return true
    }
    catch {
        console.log("could not delete database")
        return false
    }
}
