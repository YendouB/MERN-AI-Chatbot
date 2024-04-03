import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validator.js";
import { deleteUserChats, generateCompletion, sendChatsToUser } from "../controllers/chat-controllers.js";

const chatRoutes = Router();

chatRoutes.post("/new", validate(chatCompletionValidator), verifyToken, generateCompletion)
chatRoutes.get("/all-chats", verifyToken, sendChatsToUser)
chatRoutes.delete("/delete", verifyToken, deleteUserChats)


export default chatRoutes;