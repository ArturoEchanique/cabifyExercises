import { Budget } from "../models/budget.js";
import { RepBudget } from "../models/budget.js";

import lockedSync from "locked-sync"
const sync = lockedSync();


export default async () => {

    const end = await sync();
    let currentBudgetAmount = 0
    try {
        const messagesBudget = await Budget.findOne();
        if (messagesBudget) {
            currentBudgetAmount = messagesBudget.amount
            if (currentBudgetAmount > 0) {
                console.log("there is enough budget", messagesBudget.amount)
                return true
            }
            else {
                console.log("there is NOT enough budget", messagesBudget.amount)
                return false
            }
        }
        else throw "There is no budget"
        
    } catch (err) {
        console.log("Error while accessing budget", err);
    }
    finally {
        end()
    }

}
