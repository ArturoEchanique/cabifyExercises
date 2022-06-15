const express = require("express");
const logger = require("loglevel");
logger.setLevel("info")
const client = require('prom-client');



const bodyParser = require("body-parser");
const {
  Validator,
  ValidationError
} = require("express-json-validator-middleware");

const sendMessage = require("./src/controllers/sendMessage");
const getMessages = require("./src/controllers/getMessages");
const getMessageStatus = require("./src/controllers/getMessageStatus");

const app = express();

const validator = new Validator({ allErrors: true });
const { validate } = validator;

const messageSchema = {
  type: "object",
  required: ["destination", "body"],
  properties: {
    destination: {
      type: "string"
    },
    body: {
      type: "string"
    },
    location: {
      name: {
        type: "string"
      },
      cost: {
        type: "number"
      }
    }
  }
};

app.post(
  "/messages",
  bodyParser.json(),
  validate({ body: messageSchema }),
  sendMessage
);

app.get("/messages", getMessages);

app.get("/message/:messageId/status", getMessageStatus);





const counter = new client.Counter({
  name: 'metric_name',
  help: 'metric_help',
});

// const Counter = client.Counter
// const c = new Counter({
//   name: "credit test counter",
//   help: "Example of a counter",
//   labelNames: ["code"],
// })

setInterval( () =>{
counter.inc()
}, 500)


app.get("/metrics", async (req, res) =>{
  res.end(await client.register.metrics())
})



app.use(function(err, req, res, next) {
  logger.info(res.body);
  if (err instanceof ValidationError) {
    res.sendStatus(400);
  } else {
    res.sendStatus(500);
  }
});

app.listen(9010, function() {
  logger.info("App started on PORT 9010");
});
