import newcredit from "../clients/newCredit.js";

export default async (req, res) => {
  console.log("trying to post credit")
  await newcredit({
      ...req.body,
      status: "OK"
  });

  res.end("OK");
};
