import mongoose from "mongoose";

import database from "../database.js";
import repDatabase from "../repDatabase.js";

const messageSchema = new mongoose.Schema({
  destination: String,
  body: String,
  status: {
    type: String,
    enum: ["ERROR", "OK", "TIMEOUT"],
  },
});

const Message = database.model("Message", messageSchema);
const RepMessage = repDatabase.model("RepMessage", messageSchema);
export {Message, RepMessage}
