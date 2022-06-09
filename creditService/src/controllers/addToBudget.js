import addToBudget from "../clients/addToBudget.js";

export default async (req, res) => {
    const {amount} = req.body
    const budget = await addToBudget(amount);
    res.json(budget);
}
