import { Budget } from "../models/budget.js";
import { RepBudget } from "../models/budget.js";

import lockedSync from "locked-sync"
const sync = lockedSync();

export default async (incAmount) => {

    const end = await sync();
    const options = {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
    };
    try {
        const dbBudget = await Budget.findOneAndUpdate({}, { $inc: { amount: incAmount } }, options)
    }
    catch (err) {
        console.log("Error while increasing budget", err)
        return 
    }
    finally {
        end()
    }
    const end2 = await sync();
    try {
        const repBudget = await RepBudget.findOneAndUpdate({}, { $inc: { amount: incAmount } }, options)
        return repBudget

    }
    catch (err) {
        await Budget.findOneAndUpdate({ $inc: { amount: -1 * incAmount } }, options)
        console.log("Error while increasing budget, rolling back", err)
        return 
    }
    finally {
        end2()
    }

}
