import updateBudget from "../clients/updateBudget.js"
import checkHasBudget from "../clients/checkHasBudget.js"
import { creditQueue, messagesQueue } from "../queue/creditQueue.js"

export default async (job) => {

    console.log("processing credit queue:-----------", job.data)
    const message = {
        ...job.data,
    }
    if(await checkHasBudget()){
        message.hasCredit = true
        await updateBudget(-1)
    }
    else{
        message.hasCredit = false
    }
    messagesQueue.add(message);

}
