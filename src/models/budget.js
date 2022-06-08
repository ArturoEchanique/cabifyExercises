import mongoose from "mongoose";

import database from "../database.js";
import repDatabase from "../repDatabase.js";

const budgetSchema = new mongoose.Schema({
  amount: Number,
  status: {
    type: String,
    enum: ["ERROR", "OK", "TIMEOUT"],
    default: "OK"
  },
});

const Budget = database.model("Budget", budgetSchema);
const RepBudget = repDatabase.model("RepBudget", budgetSchema);
export { Budget, RepBudget }