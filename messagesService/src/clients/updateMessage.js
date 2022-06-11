import { Message } from "../models/message.js";

export default async (id, messageParams) => {

    let doc = {}
    try {
        doc = await Message.findByIdAndUpdate(id, messageParams, {new: true});
    }
    catch (err) {
        console.log("Error while updating on database", err);
    }
    return doc
}