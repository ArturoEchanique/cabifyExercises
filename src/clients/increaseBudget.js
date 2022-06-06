import Budget from "../models/budget.js";

export default async (incAmount) => {

    let updatedBudget
    const budget = await Budget.findOne()
    const initialBudget = 105
    try {
    if (budget){
        updatedBudget = await Budget.findByIdAndUpdate(budget._id, { amount: budget.amount + incAmount }, {new: true})
    }
    else{
        updatedBudget = await Budget.create({ amount: initialBudget})
    }
    return updatedBudget
    
    } catch(err) {
        console.log("Error while increasing budget", err)
    }
}
