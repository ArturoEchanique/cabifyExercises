import bodyParser from "body-parser";
import express from "express";
import { ValidationError, Validator } from "express-json-validator-middleware";

import getMessages from "./src/controllers/getMessages.js";
import getMessageStatus from "./src/controllers/getMessageStatus.js";
import sendMessage from "./src/controllers/sendMessage.js";
import queueMessage from "./src/controllers/queueMessage.js";
import addToBudget from "./src/controllers/addToBudget.js";
import recoverDatabase from "./src/controllers/recoverDatabase.js";
import deleteDatabase from "./src/controllers/deleteDatabase.js";
import {initQueue} from "./src/queue/queue.js"
// import processQueue  from "./src/queue/processQueue.js"


initQueue()
const app = express();

const validator = new Validator({ allErrors: true });
const { validate } = validator;


// import Queue from "bull";

// const queue = new Queue("myQueue");

// const main = async () => {
//   await queue.add({ name: "John", age: 30 });
// };

// queue.process((job, done) => {
//   console.log(job.data);
//   done();
// });

// main().catch(console.error);

const messageSchema = {
  type: "object",
  required: ["destination", "body"],
  properties: {
    destination: {
      type: "string",
    },
    body: {
      type: "string",
    },
  },
};

const budgetSchema = {
  type: "object",
  required: ["amount"],
  properties: {
    amount: {
      type: "number",
    },
  },
};

app.post(
  "/message",
  bodyParser.json(),
  validate({ body: messageSchema }),
  queueMessage
);

app.post(
  "/credit",
  bodyParser.json(),
  validate({ body: budgetSchema }),
  addToBudget
);

app.post(
  "/recover-database",
  bodyParser.json(),
  recoverDatabase
);

app.delete(
  "/delete-database",
  bodyParser.json(),
  deleteDatabase
);

app.get("/messages", getMessages);

app.get("/message/:messageId/status", getMessageStatus);

app.use((err, req, res, _next) => {
  console.log(res.body);
  if (err instanceof ValidationError) {
    res.sendStatus(400);
  } else {
    res.sendStatus(500);
  }
});

const port = 9003;
app.listen(port, () => {
  console.log("App started on PORT: ", port);
});
