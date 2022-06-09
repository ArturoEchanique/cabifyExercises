import { Message } from "../models/message.js";
import { RepMessage } from "../models/message.js";
import recoverDatabase from "../clients/recoverDatabase.js";

export default async (req, res) => {
    try{
        await recoverDatabase(Message, RepMessage)
        await recoverDatabase(RepMessage, Message)
        res.json("database recovered")
    }
    catch{
        res.json("could not recover database")
    }
   
}
