import express, { json } from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import authRoute from "./routers/auth.js";
import usersRoute from "./routers/users.js";
import hotelsRoute from "./routers/hotels.js";
import roomsRoute from "./routers/rooms.js";


const app=express()
app.use(json())
app.use(cors())
dotenv.config()

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

  app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
  });

app.listen(3001,()=>{
    connect()
    console.log("app listened 3001 port"); 
})