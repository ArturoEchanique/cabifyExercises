const express = require("express");
const logger = require("loglevel");
logger.setLevel("info")
const client = require('prom-client');
const {counterMet, requestTimeMet, gaugeMet} = require("./src/metrics/metrics")



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

      // requestTimeMet
      //   .labels(req.route.path)
      //   .observe(responseTimeInMs)
      
// const counter = new client.Counter({
//   name: 'metric_name',
//   help: 'metric_help',
//   labelNames: ["code", "route"],
// });

// const requestTime = new client.Histogram({
//   name: 'http_request_duration_ms',
//   help: 'Duration of HTTP requests in ms',
//   labelNames: ['route'],
//   // buckets for response time from 0.1ms to 500ms
//   buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500]
// })

// let gau = new client.Gauge({
//   name: "metric_gauge",
//   help: 'metric_help',
//   labelNames: ['route'],
// })


// var myMetrics = function (req, res, next) {

//   const eh = histogram.startTimer();
//   const es = summary.startTimer();
//   const eg = gauge.startTimer();

//   eh({ method: req.method, 'status_code': 200 });
//   es({ method: req.method, 'status_code': 200 });
//   gauge.set({ method: req.method, 'status_code': '200' }, 100);
//   gauge.labels(req.method, '200').set(100);
//   counter.inc();

//   console.log("my middleware");
//   next();

// setInterval( () =>{
// counterMet.inc()
//   requestTimeMet.labels("route").observe(8)
//   gaugeMet.set(5)
// }, 500)


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
