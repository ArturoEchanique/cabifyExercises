import Queue from "bull";
import processCreditQueue from "./processCreditQueue.js"

let messagesQueue
let creditQueue

messagesQueue = new Queue("messagesQueue", {
    // redis: { host: "localhost", port: 6379 }
    redis: { host: "redis", port: 6379 }
});
creditQueue = new Queue("creditQueue", {
        // redis: { host: "localhost", port: 6379 }
    redis: { host: "redis", port: 6379 }
});
// messagesQueue.add({ name: "this queue has to be processed by messages", age: 30 });
// creditQueue.add({ name: "this queue has to be processed by credit", age: 30 });
creditQueue.process(async (job, done) => {
    await processCreditQueue(job)
    done();
})

export { messagesQueue, creditQueue }
