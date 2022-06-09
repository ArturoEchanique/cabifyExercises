import updateBudget from "../clients/updateBudget.js";

export default async (req, res) => {
    const {amount} = req.body
    const budget = await updateBudget(amount);
    res.json(budget);
}
