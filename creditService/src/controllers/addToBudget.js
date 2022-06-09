import addToBudget from "../clients/addToBudget.js";

export default async (req, res) => {
    const {amount} = req.body
    console.log("AMOUNT IS", amount)
    const budget = await addToBudget(amount);
    console.log("budget IS", budget)
    res.json(budget);
}
