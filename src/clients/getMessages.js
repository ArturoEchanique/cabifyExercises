import {Message} from "../models/message.js";

export default (model, conditions = {}) => model.find(conditions);
