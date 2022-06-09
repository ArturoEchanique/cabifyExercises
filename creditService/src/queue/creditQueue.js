import Queue from "bull";
import processCreditQueue from "./processCreditQueue.js"

// let creditQueue

// const initCreditQueue = async () => {
//     creditQueue = new Queue("creditQueue");
//     creditQueue.process(async (job, done) => {
//         await processCreditQueue(job)
//         done();
//     })
// }

let messagesQueue
let creditQueue

messagesQueue = new Queue("messagesQueue", {
    redis: { host: "localhost", port: 6379 }
});
creditQueue = new Queue("creditQueue", {
    redis: { host: "localhost", port: 6379 }
});
messagesQueue.add({ name: "this queue has to be processed by messages", age: 30 });
creditQueue.add({ name: "this queue has to be processed by credit", age: 30 });
creditQueue.process(async (job, done) => {
    await processCreditQueue(job)
    done();
})

export { messagesQueue, creditQueue }
