import mongoose from "mongoose";

const server = "127.0.0.1:27018";
// const server = "mongodb:27018";
const database = "cabify_bootcamp";

export default mongoose.createConnection(`mongodb://${server}/${database}`, {
  useNewUrlParser: true,
});

// export default async function () {
//   return new Promise((resolve, reject) => {
//     let conn = mongoose.createConnection(`mongodb://${server}/${database}`, {
//       useNewUrlParser: true,
//     })
//     conn.on("error", function (err) {
//       reject(err);
//     })
//     conn.on("disconnected", function (err) {
//       reject(err);
//     })
//     conn.on("connected", function () {
//       resolve(conn);
//     })
//   })
// };