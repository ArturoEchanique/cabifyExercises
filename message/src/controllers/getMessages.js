const getMessages = require("../clients/getMessages");
const { counterMet, requestTimeMet, gaugeMet } = require("../metrics/metrics")

module.exports = function (req, res) {
  const end = requestTimeMet.startTimer()
  getMessages()
    .then(messages => {
      end({ status: 200, route: "get-messages" })
      counterMet.inc({ status: 200, route: "get-messages" })
      res.json(messages);
    });
};
