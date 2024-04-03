import mongoose from "mongoose";
import { randomUUID } from "crypto";

const chatSchema = new mongoose.Schema({
    id:{
        type: String,
        default: randomUUID()
    },
    role:{
        type: String,
        require: true

    },
    content:{
        type: String,
        require: true 

    }

});

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    chats: [chatSchema]
});

export default mongoose.model("User", UserSchema);

export const Chat = mongoose.model("Chat", chatSchema);