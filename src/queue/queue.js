import Queue from "bull";
import processQueue from "./processQueue.js"

let queue

const initQueue = async () => {
    queue = new Queue("messagesQueue");
    queue.process(async (job, done) => {
        await processQueue(job)
        done();
    })
}
export { initQueue, queue }
