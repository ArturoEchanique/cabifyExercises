import mongoose from "mongoose";

import database from "../creditDatabase.js";

const budgetSchema = new mongoose.Schema({
  amount: Number,
  status: {
    type: String,
    enum: ["ERROR", "OK", "TIMEOUT"],
    default: "OK"
  },
});

const Budget = database.model("Budget", budgetSchema);
export { Budget}