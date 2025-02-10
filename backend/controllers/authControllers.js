import User from "../models/user.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import {createError} from "../utils/error.js"

export const register = async (req, res, next) => {
    try { 

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        if (!req.body.username) {
            return res.status(400).json({ error: "Username is required" });
        }

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        });

        await newUser.save();
        return res.status(200).json({ message: "User created successfully" });
    } catch (err) {
        console.error("Register Error:", err);
        return res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
};


export const login = async (req, res, next) => {
    try { 
        console.log("Login Request Body:", req.body); 

        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            console.log("User not found!");
            return res.status(404).json({ error: "User not found!" });
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) {
            console.log("Wrong password!");
            return res.status(400).json({ error: "Wrong password or username!" });
            
        }
        const {password,isAdmin,...otherDetails}=user._doc
        const token = jwt.sign({id:user._id, isAdmin:user.isAdmin},process.env.JWT)
        console.log("Login successful!");
        return res.cookie("access_token",token,{
            httpOnly:true,
        }).status(200).json({...otherDetails});
    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
};
