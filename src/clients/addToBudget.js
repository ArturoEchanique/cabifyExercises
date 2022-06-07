import { Budget } from "../models/budget.js";
import { RepBudget } from "../models/budget.js";

import lockedSync from "locked-sync"
const sync = lockedSync();

export default async (incAmount) => {

    let mainBudget = {}
    let budget
    const initialBudget = 30
    const end = await sync();
    try {
        const budget = await Budget.findOne()
        if (budget) {
            mainBudget = await Budget.findByIdAndUpdate(budget._id, { amount: budget.amount + incAmount }, { new: true })
            console.log(mainBudget)
        }
        else {
            mainBudget = await Budget.create({ amount: initialBudget })
            console.log(mainBudget)
        }
    }
    catch (err) {
        console.log("Error while increasing budget", err)
        return 
    }
    finally {
        end()
    }

    try {
        const budget = await RepBudget.findOne()
        if (budget) {
            await RepBudget.findByIdAndUpdate(budget._id, { amount: budget.amount + incAmount }, { new: true })
        }
        else {
            await RepBudget.create({ amount: initialBudget })
        }
        return mainBudget

    }
    catch (err) {
        await Budget.findByIdAndUpdate(mainBudget._id, { amount: mainBudget.amount - incAmount }, { new: true })
        console.log("Error while increasing budget, rolling back", err)
        return 
    }

}
