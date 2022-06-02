const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const messageSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        chat: {
            type: Schema.Types.ObjectId,
            ref: "Chat",
        },
        messageDate: {
            type: Date,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
module.exports = model("Message", messageSchema);