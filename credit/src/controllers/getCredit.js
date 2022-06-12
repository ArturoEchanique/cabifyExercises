import getCredit from "../clients/getCredit.js";

export default async (req, res) => {
    console.log("trying to get credit")
    const credit = await getCredit();
    res.json(credit);
};
