import { model, Schema } from "mongoose";
import { NotReqString } from "./Util";

export const Poll = model('Poll', new Schema({
    guildId: NotReqString,
    authorId: NotReqString,
    data: {
        question: NotReqString,
        choices: [NotReqString]
    }
}))