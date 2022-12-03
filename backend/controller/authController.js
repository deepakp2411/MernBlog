import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000)

    });

    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch (error) {
    res.status(500).json({error: error.message})
  }
};


// Login //

export const login = async (req, res) => {
    try {
        
        const { email, password } = req.body;
        const user = await UserModel.findOne({email: email})
        if(!user) return res.status(400).json({ msg: "User does not exit" });

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({ msg: "Invalid Credentials." });

        const token = jwt.sign({id: error.error.message},process.env.JWT_SECRET);
        delete user.password;

        res.status(200).json({ token,user })
        
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}