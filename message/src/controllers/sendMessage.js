const sendMessage = require("../jobs/sendMessage");
const logger = require("loglevel");
const { counterMet, requestTimeMet} = require("../metrics/metrics")

module.exports = function (req, res) {
  const end = requestTimeMet.startTimer()
  sendMessage(req.body)
    .then(messageId => {
      counterMet.inc({ status: 200, route: "post-messages" })
      const response = {
        messageId
      }
      const duration = end({ status: 200, route: "post-messages" })
      logger.debug("send message duration is", duration)
      res.statusCode = 200;
      res.end(JSON.stringify(response));
    })
    .catch(error => {
      end({ status: 500, route: "post-messages" })
      counterMet.inc({ status: 500, route: "post-messages" })
      logger.error(error);
      res.statusCode = 500;
      res.end(JSON.stringify(error));
    });
};