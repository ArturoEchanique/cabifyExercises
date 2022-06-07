import addToBudget from "../clients/addToBudget.js";
import { Budget } from "../models/budget.js";
import { RepBudget } from "../models/budget.js";

export default async (req, res) => {
    const {amount} = req.body
    const budget = await addToBudget(amount);
    // const repBudget = await addToBudget(RepBudget, amount);

    res.json(budget);
}
