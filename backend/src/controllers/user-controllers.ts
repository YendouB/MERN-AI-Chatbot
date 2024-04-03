import { Request, Response, NextFunction } from "express"
import User from "../models/User.js"
import { hash, compare } from "bcrypt";
import { body } from "express-validator";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers = async (req:Request, res: Response, next: NextFunction) => {
   console.log('getting all users');
   
   try{
      const users = await User.find();

      return res.status(200).json({
         message : "OK",
         users
      })

   }catch(error){
      return res.status(200).json({
         message : "ERROR",
         "cause" : error.message       
      })

   }
}

export const userSignup = async (req:Request, res: Response, next: NextFunction) => {
   console.log('creating user...');
   
   try{
      const {name, email, password} = req.body;
      const existingUser = await User.findOne({email})
      if (existingUser){
         return res.status(401).send("User already register ")
      }
      const hashedPassword = await hash(password, 10);
      const user = new User({name, email, password: hashedPassword});
      user.save()

       // create token and store cookie
      res.clearCookie(COOKIE_NAME, {
         httpOnly: true,
         domain: process.env.DOMAIN,
         signed: true,
         path: "/",
      });

      const token = createToken(user._id.toString(), user.email, "7d");
      const expires = new Date();
      expires.setDate(expires.getDate() + 7);
      res.cookie(COOKIE_NAME, token, {
         path: "/",
         domain: process.env.DOMAIN,
         expires,
         httpOnly: true,
         signed: true,
      });

      return res.status(201).json({ message: "OK", name: user.name, email: user.email });


   }catch(error){
      return res.status(200).json({
         message : "ERROR",
         "cause" : error.message       
      })

   }
}

export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
   console.log('connecting user...');

   try {
      const {email, password} = req.body

      const user = await User.findOne({email})
      if(!user){
         return res.status(401).send("User not registered")
      }

      const isPasswordCorrect = await compare(password, user.password)
      if(!isPasswordCorrect){ 
         return res.status(403).send("Incorrect Password")
      }

      //If the guy is logging he should haven't had an old cookie
      res.clearCookie(COOKIE_NAME, {
         path: "/",
         domain: process.env.DOMAIN,
         httpOnly: true,
         signed: true
      } )
      const token = createToken(
         user._id.toString(),
         user.email,
         "7d"
      )
      const expires = new Date()
      expires.setDate(expires.getDate() + 7)
      res.cookie(COOKIE_NAME, token, {
         path: "/",
         domain: process.env.DOMAIN,
         expires,
         httpOnly: true,
         signed: true
      })


      return res
         .status(200)
         .json({ message: "OK", name: user.name, email: user.email });


      
   } catch (error) {
      
   }
   
}

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
   console.log('verifying user...');

   try {
      const user = await User.findById(res.locals.jwtData.id)
      if(!user){
         return res.status(401).send("User not registered or Token problem")
      }
      if(user._id.toString() !== res.locals.jwtData.id){ 
         return res.status(401).send("Permissions didn't match")
      }
      console.log(user._id.toString(), res.locals.jwtData.id );
      
      return res
         .status(200)
         .json({ message: "OK", name: user.name, email: user.email });

      
   } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
      
   }
   
}


export const userLogout = async (req: Request, res: Response, next: NextFunction) => {
   console.log('loging out user...');

   try {
      const user = await User.findById(res.locals.jwtData.id)
      if(!user){
         return res.status(401).send("User not registered or Token problem")
      }
      if(user._id.toString() !== res.locals.jwtData.id){ 
         return res.status(401).send("Permissions didn't match")
      }      
 
      res.clearCookie(COOKIE_NAME, {
         path: "/",
         domain: process.env.DOMAIN,
         httpOnly: true,
         signed: true
      } );

      return res.status(200).json({ message: "OK", name: user.name, email: user.email });

      
   } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
      
   }
   
}