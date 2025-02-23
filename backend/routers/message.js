import express from "express";
import Message from "../models/message.js";

const router = express.Router();


router.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 }); 
    res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

export default router;