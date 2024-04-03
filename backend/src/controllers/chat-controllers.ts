import { NextFunction, Response, Request } from "express";
import User, { Chat } from "../models/User.js";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";
import { configurationOpenAI } from "../config/openai-config.js";

export const generateCompletion = async (req: Request, res: Response, next: NextFunction) => {
    const { message } = req.body
    console.log("generating completion...");
    
    
    try {
   
        const user = await User.findById(res.locals.jwtData.id);
        if (!user){
            return res.status(401).json({ message: "User not registered OR Token malfunctioned" });
        }

        // Grab chat of user

        const chats = user.chats.map(({role,content}) => ({
            role,
            content})) as ChatCompletionRequestMessage[];

        chats.push({content: message, role: "user"})
        user.chats.push({content: message, role: "user"})
 

        // Send all chats with new one to OpenAI API
        const config = configurationOpenAI();
        const openai = new OpenAIApi(config);
        
        
        // get last response
        const chatResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: chats,
        });
        

        user.chats.push(chatResponse.data.choices[0].message);
        //Ajouter la modification au noveau de la base de donnée
        await user.save()
        return res.status(200).json({ chats: user.chats });

    } catch (error) {

        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });

    }


}

export const sendChatsToUser = async (req: Request, res: Response, next: NextFunction) => {
    console.log('sendinds chat to user...');
 
    try {
       const user = await User.findById(res.locals.jwtData.id)
       if(!user){
          return res.status(401).send("User not registered or Token problem")
       }
       if(user._id.toString() !== res.locals.jwtData.id){ 
          return res.status(401).send("Permissions didn't match")
       }
       
       console.log(user.chats);
       
       return res
        .status(200)
        .json({ message: "OK", chats: user.chats});
 
 
       
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "ERROR", cause: error.message });
    }
    
 }


 export const deleteUserChats = async (req: Request, res: Response, next: NextFunction) => {
    console.log('deletings all chats of the user...');
 
    try {
       const user = await User.findById(res.locals.jwtData.id)
       if(!user){
          return res.status(401).send("User not registered or Token problem")
       }
       if(user._id.toString() !== res.locals.jwtData.id){ 
          return res.status(401).send("Permissions didn't match")
       }

       //@ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({ message: "OK" });
       
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "ERROR", cause: error.message });
    }
    
 }