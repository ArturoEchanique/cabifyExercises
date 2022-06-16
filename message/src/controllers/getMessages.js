const getMessages = require("../clients/getMessages");
const { counterMet, requestTimeMet, gaugeMet } = require("../metrics/metrics")

module.exports = function(req, res) {
  getMessages().then(messages => {
    counterMet.inc({ status: 200, endpoint: "get-messages" })
    res.json(messages);
  });
};
