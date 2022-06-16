const getMessage = require("../clients/getMessage");
const { counterMet, requestTimeMet, gaugeMet } = require("../metrics/metrics")

module.exports = function(req, res) {
  const messageId = req.params.messageId;
  const conditions = {
    _id: messageId
  };

  getMessage(conditions)
    .then(message => {
      if (message == null) {
        counterMet.inc({ status: 400, endpoint: "get-messageStatus" })
        res.statusCode = 404;
        res.end("Message not found");
      } else {
        counterMet.inc({ status: 200, endpoint: "get-messageStatus" })
        res.json({
          messageId,
          status: message.status
        });
      }
    })
};