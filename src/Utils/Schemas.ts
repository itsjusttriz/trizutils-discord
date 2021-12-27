import { model, Schema } from "mongoose";

const pollSchema = new Schema({
    guildId: String,
    authorId: String,
    data: {
        question: String,
        choices: []
    }
})

export const Poll = model('Poll', pollSchema)