import { Request, Response } from "express";
import User from "../../models/User/User";
import { hashPasswordFunction, comparePasswords } from "../../utils";
import { createAccessToken } from "../../middleware";

export const register = async (req: Request, res: Response) => {
  try {
    // deconstruct request body info
    const { username, email, password } = req.body;

    // find user if exists in database
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ mssg: "User already registered" });
    }
    // hash password
    const hashedPassword = await hashPasswordFunction(password, 10);

    // new User to store
    const newUser = new User({ username, email, password: hashedPassword });

    // store in database
    const userSaved = await newUser.save();

    res.status(200).json({ mssg: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ mssg: "error during user registration" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    // deconstruct request body info
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ mssg: "User not found in database" });
    }

    // compare passwords
    if(!comparePasswords(password, user.password)){
      return res.status(400).json({ mssg: "Password Incorrect" })
    }

    const token = createAccessToken({ id: user._id });

    res.status(200).json({ token });

  } catch (error) {
    res.status(500).json({ mssg: "error during user authentication proccess" });
  }
};