import { Message } from "../models/message.js";
import { RepMessage } from "../models/message.js";

export default async (messageParams) => {

  let message = new Message(messageParams);
  let repMessage = new RepMessage(messageParams);

  if (messageParams.hasOwnProperty('_id')) {
    message = Message.findById(messageParams._id)
  }

  message.backedUp = false
  repMessage.backedUp = false
  let doc = {}
  try {
    doc = await message.save();
    repMessage.backedUp = true
    console.log("db message saved succesfully:");
  }
  catch (err) {
    console.log("Error while saving on database", err);
  }
  try {
    await repMessage.save();
    console.log("repDb message saved succesfully")
    message.backedUp = true
    doc = await message.save()
  }
  catch (err) {
    console.log("Error while saving on repDatabase", err);
  }
  return doc
}
