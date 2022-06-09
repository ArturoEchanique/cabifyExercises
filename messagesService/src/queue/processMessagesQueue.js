import sendMessage from "../controllers/sendMessage.js";
import updateMessage from "../clients/updateMessage.js";

export default async (job) => {

    console.log("processing message queue:-----------", job.data)

    const dbId = job.data._id
    const message = {
        ...job.data
    }
    if (message.hasCredit){
        const processingMessage = {
            ...message,
            status: "PROCESSING"
        }
        console.log("processing message is", await updateMessage(dbId, processingMessage))
        await sendMessage(dbId, message)
        const finishedMessage = {
            ...message,
            status: "FINISHED"
        }
        console.log("finished message is", await updateMessage(dbId, finishedMessage))
    }
    else{
        console.log("error, there is no credit left")
    }
    
}
