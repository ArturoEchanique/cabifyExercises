import {creditQueue, messagesQueue} from "./src/queue/creditQueue.js"
import dotenv from 'dotenv'
import bodyParser from "body-parser";
import express from "express";
import { ValidationError, Validator } from "express-json-validator-middleware";
import addToBudget from "./src/controllers/addToBudget.js";

const app = express();

const validator = new Validator({ allErrors: true });
const { validate } = validator;

const budgetSchema = {
    type: "object",
    required: ["amount"],
    properties: {
        amount: {
            type: "number",
        },
    },
};

app.post(
    "/credit",
    bodyParser.json(),
    validate({ body: budgetSchema }),
    addToBudget
);

app.use((err, req, res, _next) => {
    console.log(res.body);
    if (err instanceof ValidationError) {
        res.sendStatus(400);
    } else {
        res.sendStatus(500);
    }
});

const port = 9004;
app.listen(port, () => {
    console.log("App started on PORT: ", port);
});
