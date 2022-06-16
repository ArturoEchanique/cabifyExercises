const sendMessage = require("../jobs/sendMessage");
const logger = require("loglevel");
const { counterMet, requestTimeMet, gaugeMet } = require("../metrics/metrics")

module.exports = function (req, res) {
  sendMessage(req.body)
    .then(messageId => {
      counterMet.inc({ status: 200, endpoint: "post-messages" })
      const response = {
        messageId
      };
      res.statusCode = 200;
      res.end(JSON.stringify(response));
    })
    .catch(error => {
      counterMet.inc({ status: 500, endpoint: "post-messages" })
      logger.error(error);
      res.statusCode = 500;
      res.end(JSON.stringify(error));
    });
};

// setInterval(() => {
//   const rand = Math.random() > 0.7
//   if (rand) counterMet.inc({ status: 400, endpoint: "post-messages" })
//   else counterMet.inc({ status: 200, endpoint: "post-messages" })
//   requestTimeMet.labels("route").observe(8)
//   gaugeMet.set(5)
// }, 500)