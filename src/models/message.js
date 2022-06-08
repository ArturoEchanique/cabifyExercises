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
  backedUp: {
    type: Boolean,
  },
});

const Message = database.model("Message", messageSchema);
const RepMessage = repDatabase.model("RepMessage", messageSchema);
export {Message, RepMessage}

// let Message = await database()
// Message = Message.model("Message", messageSchema);

// let RepMessage = {};
// try {
//   console.log("precapturando el error")
//   RepMessage = await repDatabase();
//   RepMessage.model("RepMessage", messageSchema);
//   console.log("post")
// } catch {
//   console.log("Holi de nueviiiiiiiiiii")
// }
// export { Message, RepMessage }