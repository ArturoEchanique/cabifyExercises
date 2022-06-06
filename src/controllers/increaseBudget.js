import increaseBudget from "../clients/increaseBudget.js";

export default async (req, res) => {
    const {amount} = req.body
    const budget = await increaseBudget(amount);

    res.json(budget);
}
