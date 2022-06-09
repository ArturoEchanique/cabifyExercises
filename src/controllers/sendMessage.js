import http from "http";
import updateMessage from "../clients/updateMessage.js";
import checkHasBudget from "../clients/checkHasBudget.js";
import addToBudget from "../clients/addToBudget.js";

export default async (messageId, message) => {
  
  const body = JSON.stringify(message);
  const postOptions = {
    host: "127.0.0.1",
    // host: "messageapp",
    port: 3000,
    path: "/message",
    method: "post",
    json: true,
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(body),
    },
  };

  const postReq = http.request(postOptions);

  postReq.on("response", async (postRes) => {
    try {
      await addToBudget(-1);
      await updateMessage(messageId, {
        ...message,
        status: postRes.statusCode === 200 ? "OK" : "ERROR",
      });
      if (postRes.statusCode !== 200) {
        throw new Error('Error in the messageapp request');
      }
    } catch (error) {
      console.log(error.message);
    }
  });

  postReq.on("timeout", async () => {
    console.error("Timeout Exceeded!");
    postReq.abort();

    try {
      await updateMessage(messageId, {
        ...message,
        status: "TIMEOUT",
      });

    } finally {
    }
  });

  postReq.on("error", (error) => {
  });

  postReq.write(body);
  postReq.end();
}
