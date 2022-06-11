import Queue from "bull";
import processQueue from "./processMessagesQueue.js"
import "dotenv/config"

let messagesQueue
let creditQueue

messagesQueue = new Queue("messagesQueue", {
    redis: { host: process.env.REDIS_HOST, port: 6379 }
});
creditQueue = new Queue("creditQueue", {
    redis: { host: process.env.REDIS_HOST, port: 6379 }
});
console.log("added elements to both queues")
// creditQueue.add({ name: "this queue has to be processed by credit", age: 30 });
// messagesQueue.add({ name: "this queue has to be processed by messages", age: 30 });
messagesQueue.process(async (job, done) => {
    await processQueue(job)
    done();
})
export { messagesQueue, creditQueue }
