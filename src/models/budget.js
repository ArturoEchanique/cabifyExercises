import mongoose from "mongoose";

import database from "../database.js";
import repDatabase from "../repDatabase.js";

const budgetSchema = new mongoose.Schema({
  amount: Number,
});


const Budget = database.model("Budget", budgetSchema);
const RepBudget = repDatabase.model("RepBudget", budgetSchema);
export { Budget, RepBudget }

// export default database.model("Budget", budgetSchema);
