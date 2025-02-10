import express from "express"
const router = express.Router()

import Hotel from "../models/hotel.js"
import { deleteHotel,
        getByIdHotel,
        getHotel,
        postHotel,
        updateHotel 
} from "../controllers/hotelControllers.js"
import { verifyAdmin } from "../utils/verifyToken.js"


// POST
router.post("/",verifyAdmin, postHotel)
// UPDATE
router.put("/:id",verifyAdmin,updateHotel)
// DELETE
router.delete("/:id",verifyAdmin,deleteHotel)
// GETByID
router.get("/:id",getByIdHotel)
// GETALL
router.get("/", getHotel)   


export default router