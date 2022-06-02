const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const messageSchema = new Schema(
    {
        destination: {
            type: String
        },
        message: {
            type: String
        },
        number: {
            type: Number
        },
        state: {
            type: String,
            enum: ["NOT-SENT", "SENT-UNCONFIRMED", "SENT"],
            default: "NOT-SENT"
        },
    },
    {
        timestamps: true,
    }
);
module.exports = model("Message", messageSchema);