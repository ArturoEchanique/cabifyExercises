// import {Budget} from "../models/budget.js";
// import { RepBudget } from "../models/budget.js";

import lockedSync from "locked-sync"
const sync = lockedSync();

export default async (model, incAmount) => {

    const end = await sync();
    let updatedBudget
    const budget = await model.findOne()
    const initialBudget = 30
    try {
    if (budget){
        updatedBudget = await model.findByIdAndUpdate(budget._id, { amount: budget.amount + incAmount }, {new: true})
    }
    else{
        updatedBudget = await model.create({ amount: initialBudget})
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
