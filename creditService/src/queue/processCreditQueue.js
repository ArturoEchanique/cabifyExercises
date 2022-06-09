import checkHasBudget from "../clients/checkHasBudget.js"
import { creditQueue, messagesQueue } from "../queue/creditQueue.js"

export default async (job) => {

    console.log("processing credit queue:-----------", job.data)
    const message = {
        ...job.data,
    }
    if(await checkHasBudget()){
        message.hasCredit = true
    }
    else{
        message.hasCredit = false
    }
    messagesQueue.add(message);

    // const messageId = job.data._id
    // const message = {
    //     destination: job.data.destination,
    //     body: job.data.body,
    // }
    // const processingMessage = {
    //     ...message,
    //     status:"PROCESSING"
    // }
    // console.log("processing message is", await updateMessage(messageId, processingMessage))
    // await sendMessage(messageId, message)
    // const finishedMessage = {
    //     ...message,
    //     status: "FINISHED"
    // }
    // console.log("finished message is", await updateMessage(messageId, finishedMessage))
}
