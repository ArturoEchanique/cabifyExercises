import Queue from "bull";
import processQueue from "./processMessagesQueue.js"
import processCreditQueue from "../../creditService/src/queue/processCreditQueue.js"

let messagesQueue
let creditQueue

messagesQueue = new Queue("messagesQueue", {
    redis: { host: "localhost", port: 6379 }
});
creditQueue = new Queue("creditQueue", {
    redis: { host: "localhost", port: 6379 }
});
// creditQueue.add({ name: "this queue has to be processed by credit", age: 30 });
// messagesQueue.add({ name: "this queue has to be processed by messages", age: 30 });
messagesQueue.process(async (job, done) => {
    await processQueue(job)
    done();
})
// const initCreditQueue = async () => {
//     creditQueue = new Queue("creditQueue");
//     await creditQueue.add({ name: "credit job", age: 40 });
//     creditQueue.process(async (job, done) => {
//         await processCreditQueue(job)
//         done();
//     })
// }
export { messagesQueue, creditQueue }
