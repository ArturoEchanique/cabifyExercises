import {Message} from "../models/message.js";
import { RepMessage } from "../models/message.js";
export default (conditions = {}) => {

    try{
        return Message.find(conditions)
    }
    catch{
        return RepMessage.find(conditions)
    }
}
