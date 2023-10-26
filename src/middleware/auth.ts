import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import { config } from "dotenv";
config();
import User from "../models/User/User";
import { PayloadType } from "../types/types";
import { login } from "../controllers";

const TOKEN_SECRET: string | undefined = process.env.TOKEN_SECRET;

export const createAccessToken = (payload: PayloadType): string =>
  jwt.sign(payload, TOKEN_SECRET!, { expiresIn: "1d" });

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, TOKEN_SECRET!);
  } catch (error) {
    console.error(
      "Token verification proccess interrupted!"
    );
    throw error;
  }
};


export const authenticationByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // extract jwt from headers
        const token = req.header("x-auth-token");
        console.log(token);
        
        if (!token) {
          throw new Error();
        }
    
        const decoded: string | JwtPayload = verifyToken(token);
        
        const userResponse = await User.findById({ _id: (decoded as JwtPayload).id }).select('username');        
        
        if( (decoded as JwtPayload).id === userResponse!.id ) {
            console.log("User has been authenticated successfully");
            next();
        }else{
            res.status(401).json({ mssg: "Error during authentication proccess" });
        }
        
      } catch (error) {
        console.error(error);
        res.status(401).send("Authentication needed");
      }
};