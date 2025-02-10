import express from "express"
const router = express.Router()

import Hotel from "../models/hotel.js"
import { deleteHotel,
        getByIdHotel,
        getHotel,
        postHotel,
        updateHotel 
} from "../controllers/hotelControllers.js"


// POST
router.post("/", postHotel)
// UPDATE
router.put("/:id",updateHotel)
// DELETE
router.delete("/:id",deleteHotel)
// GETByID
router.get("/:id",getByIdHotel)
// GETALL
router.get("/", getHotel)   


export default router