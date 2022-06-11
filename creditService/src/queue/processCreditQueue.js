import updateBudget from "../clients/updateBudget.js"
import checkHasBudget from "../clients/checkHasBudget.js"
import { creditQueue, messagesQueue } from "../queue/creditQueue.js"

export default async (job) => {

    const message = {
        ...job.data,
    }
    console.log("credit service is processing message:-----------", message._id)
    if(await checkHasBudget()){
        message.hasCredit = true
        await updateBudget(-1)
    }
    else{
        message.hasCredit = false
    }
    messagesQueue.add(message);

}
