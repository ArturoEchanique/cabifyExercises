import getMessages from "../clients/getMessages.js";
import { Message } from "../models/message.js";
import { RepMessage } from "../models/message.js";

export default async (req, res) => {
  const messages = await getMessages(Message);

  res.json(messages);
}
