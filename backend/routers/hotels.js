import express from "express"
const router = express.Router()

import Hotel from "../models/hotel.js"
import { deleteHotel,
        getByIdHotel,
        getHotel,
        postHotel,
        updateHotel,
        countByCity,
        countByType,
        getHotelRooms
} from "../controllers/hotelControllers.js"
import { verifyAdmin } from "../utils/verifyToken.js"


// POST
router.post("/",verifyAdmin, postHotel)
// UPDATE
router.put("/:id",verifyAdmin,updateHotel)
// DELETE
router.delete("/:id",verifyAdmin,deleteHotel)
// GETByID
router.get("/find/:id",getByIdHotel)
// GETALL
router.get("/", getHotel)   
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);


export default router