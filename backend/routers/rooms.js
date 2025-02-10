import express from "express"
import { createRoom, deleteRoom, getByIdRoom, getRoom, updateRoom } from "../controllers/roomControllers.js"
import {verifyAdmin} from "../utils/verifyToken.js"
const router = express.Router()

// POST
router.post("/:hotelid",verifyAdmin, createRoom)
// UPDATE
router.put("/:id",verifyAdmin,updateRoom)
// DELETE
router.delete("/:id",verifyAdmin,deleteRoom)
// GETByID
router.get("/:id",getByIdRoom)
// GETALL
router.get("/", getRoom)   


export default router