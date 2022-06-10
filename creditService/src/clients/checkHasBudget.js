import { Budget } from "../models/budget.js";
import lockedSync from "locked-sync"
const sync = lockedSync();

export default async () => {
    let messagesBudget
    const end = await sync()
    try {
        messagesBudget = await Budget.findOne()
        if (!messagesBudget) {
            messagesBudget = await Budget.create({ amount: 50 })
        }
    }
    catch (err) {
        console.log("Error while accessing budget", err)
    }
    finally {
        end()
    }
    let currentBudgetAmount = 0
    if (messagesBudget) {
        currentBudgetAmount = messagesBudget.amount
        if (currentBudgetAmount > 0) {
            console.log("there is enough budget: ", messagesBudget.amount)
            return true
        }
        else {
            console.log("there is NOT enough budget", messagesBudget.amount)
            return false
        }
    }
}
