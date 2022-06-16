const getMessage = require("../clients/getMessage");
const { counterMet, requestTimeMet, gaugeMet } = require("../metrics/metrics")

module.exports = function(req, res) {
  const messageId = req.params.messageId;
  const conditions = {
    _id: messageId
  }
  const end = requestTimeMet.startTimer()
  getMessage(conditions)
    .then(message => {
      if (message == null) {
        end({ status: 400, route: "get-messageStatus" })
        counterMet.inc({ status: 400, route: "get-messageStatus" })
        res.statusCode = 404;
        res.end("Message not found");
      } else {
        end({ status: 200, route: "get-messageStatus" })
        counterMet.inc({ status: 200, route: "get-messageStatus" })
        res.json({
          messageId,
          status: message.status
        });
      }
    })
};