import getMessageStatus from "../clients/getMessageStatus.js";

export default async (req, res) => {
    console.log("params are", req.params)
    const {messageId} = req.params
    const messageStatus = await getMessageStatus(messageId);
    res.json({status: messageStatus});
}
