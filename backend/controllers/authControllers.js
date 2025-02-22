import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: "Username, email, and password are required" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ error: "Password must be at least 8 characters long and contain both uppercase and lowercase letters" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already registered" });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username,
            email,
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
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            console.log("User not found!");
            return res.status(404).json({ error: "User not found!" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            console.log("Wrong password!");
            return res.status(400).json({ error: "Wrong password or username!" });
        }

        const { password: userPassword, ...otherDetails } = user._doc;
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT
        );

        console.log("Login successful!");

        return res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({ ...otherDetails, isAdmin: user.isAdmin, token });
    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
};