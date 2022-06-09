import mongoose from "mongoose";

import database from "../database.js";
import repDatabase from "../repDatabase.js";

const messageSchema = new mongoose.Schema({
  destination: String,
  body: String,
  messageId: Number,
  status: {
    type: String,
    enum: ["QUEUED", "PROCESSING", "FINISHED", "ERROR", "TIMEOUT", "OK"],
  },
  hasCredit: {
    type: Boolean,
    default: false
  },
  backedUp: {
    type: Boolean,
    default: false
  },
});

const Message = database.model("Message", messageSchema);
const RepMessage = repDatabase.model("RepMessage", messageSchema);
export {Message, RepMessage}