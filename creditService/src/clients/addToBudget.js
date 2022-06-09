import { Budget } from "../models/budget.js";
import lockedSync from "locked-sync"

const sync = lockedSync();

export default async (incAmount) => {

    const end = await sync();
    let budget = {}
    const options = {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
    };
    try {
        console.log("trying to find budget")
        budget = await Budget.findOneAndUpdate({}, { $inc: { amount: incAmount } }, options)
    }
    catch (err) {
        console.log("Error while increasing budget", err)
        return
    }
    finally {
        end()
        return budget
    }
}
