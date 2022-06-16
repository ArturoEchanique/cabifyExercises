const Message = require("../models/message");
const { unversionedClone } = require("../utils");
const logger = require("loglevel");
const { requestTimeMet } = require("../metrics/metrics")

function saveMessage(model, newValue) {
  return model.findOneAndUpdate(
    {
      _id: newValue._id
    },
    newValue,
    {
      upsert: true,
      new: true
    }
  );
}

function saveMessageReplica(replica, retries) {
  if (retries > 0) {
    return saveMessage(Message("replica"), replica)
      .then(doc => {
        logger.info("Message replicated successfully", doc);
        return doc;
      })
      .catch(err => {
        logger.error("Error while saving message replica", err);
        logger.error("Retrying...");
        return saveMessageReplica(replica, retries - 1);
      });
  }
}

function saveMessageTransaction(newValue) {
  return saveMessage(Message(), newValue)
    .then(doc => {
      logger.info("Message saved successfully:", doc);
      return unversionedClone(doc);
    })
    .then(clone => {
      saveMessageReplica(clone, 3);
      return clone;
    })
    .catch(err => {
      logger.error("Error while saving message", err);
      throw err;
    });
}

module.exports = function (messageParams, cb) {
  const end = requestTimeMet.startTimer()
  saveMessageTransaction(messageParams)
    .then(() => {
      cb()
      end({ status: 200, route: "message-queued-time" })
    })
    .catch(err => {
      end({ status: 500, route: "message-queued-time" })
      cb(err);
    });
};
