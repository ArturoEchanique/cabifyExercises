import budget from "../models/budget.js";
import Budget from "../models/budget.js";

export default async () => {

    let currentBudgetAmount = 0
    console.log("trying to check budget")
    try {
        const messagesBudget = await Budget.findOne();
        if(messagesBudget) currentBudgetAmount = messagesBudget.amount
        if (messagesBudget.amount > 0) {
            console.log("There is enough credit ", currentBudgetAmount)
            // await Budget.findByIdAndUpdate(messagesBudget._id, { amount: messagesBudget.amount - 1 })
            return true
        }
        else {
            console.log("There is NOT enough credit ", currentBudgetAmount)
            return false
        }
    } catch (err) {
        console.log("Error while accessing budget", err);
    }
}
