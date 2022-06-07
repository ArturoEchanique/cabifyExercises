import mongoose from "mongoose";

import database from "../database.js";
import repDatabase from "../repDatabase.js";

const budgetSchema = new mongoose.Schema({
  amount: Number,
});



const Budget = database.model("Budget", budgetSchema);
const RepBudget = repDatabase.model("RepBudget", budgetSchema);
export { Budget, RepBudget }


// const Budget = database().model("Budget", budgetSchema);

// let Budget = await database()
// Budget = Budget.model("Budget", budgetSchema);
// let RepBudget = {};
// try {
//   RepBudget = await repDatabase()
//   RepBudget = RepBudget.model("RepBudget", budgetSchema);
// } catch (error) {
//   console.log(error)
//   console.log("holiiiiii")
//   RepBudget = null;
// }
// export { Budget, RepBudget }

// export default database.model("Budget", budgetSchema);
