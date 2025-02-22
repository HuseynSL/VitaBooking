import express, { json } from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import authRoute from "./routers/auth.js";
import usersRoute from "./routers/users.js";
import hotelsRoute from "./routers/hotels.js";
import roomsRoute from "./routers/rooms.js";
import reservationRoute from "./routers/reservations.js";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import http from "http";
import Stripe from "stripe";

dotenv.config()
const app=express()
const server = http.createServer(app);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

app.post("/create-payment-intent", async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe amount is in cents
      currency: currency,
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
  },
});
app.use(cookieParser())
app.use(json())
dotenv.config()
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));


io.on("connection", (socket) => {
  console.log("Bir kullanıcı bağlandı:", socket.id);

  socket.on("sendMessage", (data) => {
    console.log(`Mesaj alındı: ${data.user}: ${data.text}`);
    
    io.emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("Bir kullanıcı ayrıldı:", socket.id);
  });
});


const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO);
      console.log("Connected to database.");
    } catch (error) {
      throw error;
    }
  };


  app.use("/api/auth",authRoute);
  app.use("/api/users",usersRoute);
  app.use("/api/hotels",hotelsRoute);
  app.use("/api/rooms",roomsRoute);
  app.use("/api/reservations", reservationRoute);

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

server.listen(3001, () => {
  connect();
  console.log("Server is running on port 3001");
});
