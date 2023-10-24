import { Request, Response } from "express";
import { verifyToken } from "../../middleware";
import User from "../../models/User/User";

export const getUser = async (req: Request, res: Response) => {
    try {
      // extract token
      const token = req.headers["x-auth-token"];
      
      // verify token
      const decoded = verifyToken((token as string));
        
      // mongoDB request
      const user = await User.findById(decoded.id).select('-password');

      if(!user){
        return res.status(404).json({ mssg: "User not found" });
      }
      
      return res.status(200).json(user);
      
    } catch (error) {
      return res.status(500).json({ mssg: "Error getting user information" });
    }
  };