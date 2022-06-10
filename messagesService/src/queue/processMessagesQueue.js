import sendMessage from "../controllers/sendMessage.js";
import updateMessage from "../clients/updateMessage.js";

export default async (job) => {

    const message = {
        ...job.data
    }
    const dbId = message._id
    console.log("messages service is processing message:-----------", dbId)
    const processingMessage = {
        ...message,
        status: "PROCESSING"
    }
    console.log("processing message is", await updateMessage(dbId, processingMessage))
    if (message.hasCredit){
        await sendMessage(dbId, message)
        const finishedMessage = {
            ...message,
            status: "FINISHED"
        }
        console.log("finished message is", await updateMessage(dbId, finishedMessage))
    }
    else{
        const unsentMessage = {
            ...message,
            status: "FINISHED"
        }
        console.log("The message could not be sent, no credit left, finished message is: ", await updateMessage(dbId, unsentMessage))
    }
    
}
