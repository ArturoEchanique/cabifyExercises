import Queue from "bull";
import processQueue from "./processMessagesQueue.js"

let messagesQueue
let creditQueue

messagesQueue = new Queue("messagesQueue", {
    redis: { host: "redis", port: 6379 }
});
console.log("REDIS_HOST ENV variable is...", process.env.REDIS_HOST)
creditQueue = new Queue("creditQueue", {
    redis: { host: "redis", port: 6379 }
});
console.log("added elements to both queues")
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
