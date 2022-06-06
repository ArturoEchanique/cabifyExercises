import Budget from "../models/budget.js";

import lockedSync from "locked-sync"
const sync = lockedSync();

export default async (incAmount) => {

    const end = await sync();
    let updatedBudget
    const budget = await Budget.findOne()
    const initialBudget = 30
    try {
    if (budget){
        updatedBudget = await Budget.findByIdAndUpdate(budget._id, { amount: budget.amount + incAmount }, {new: true})
    }
    else{
        updatedBudget = await Budget.create({ amount: initialBudget})
    }
    return updatedBudget
    
    } 
    catch(err) {
        console.log("Error while increasing budget", err)
    } 
    finally {
        end()
    }

}
