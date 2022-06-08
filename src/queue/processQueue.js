import sendMessage from "../controllers/sendMessage.js";
import updateMessage from "../clients/updateMessage.js";

export default async (job) => {

    const messageId = job.data._id
    const message = {
        destination: job.data.destination,
        body: job.data.body,
    }
    const processingMessage = {
        ...message,
        status:"PROCESSING"
    }
    console.log("processing message is", await updateMessage(messageId, processingMessage))
    await sendMessage(messageId, message)
    const finishedMessage = {
        ...message,
        status: "FINISHED"
    }
    console.log("finished message is", await updateMessage(messageId, finishedMessage))
}
