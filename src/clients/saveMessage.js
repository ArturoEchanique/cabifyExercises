import { Message } from "../models/message.js";
import { RepMessage } from "../models/message.js";

export default async (messageParams) => {

  const message = new Message(messageParams);
  const repMessage = new RepMessage(messageParams);
  message.backedUp = false
  repMessage.backedUp = false
  let doc = {}
  try {
    doc = await message.save();
    repMessage.backedUp = true
    console.log("db message saved succesfully:", doc);
  }
  catch (err) {
    console.log("Error while saving on database", err);
  }
  try {
    doc = await repMessage.save();
    console.log("repDb message saved succesfully:", doc)
    message.backedUp = true
    doc = await message.save()
    console.log("message updated succesfully:", doc);
  }
  catch (err) {
    console.log("Error while saving on repDatabase", err);
  }
  return doc
}
