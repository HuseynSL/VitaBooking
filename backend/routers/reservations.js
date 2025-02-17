import express from "express";
import {
    createReservation,
    getUserReservations,
    cancelReservation,
} from "../controllers/reservationControllers.js";

const router = express.Router();


router.get("/user/:userId", getUserReservations);


router.post("/", createReservation);


router.delete("/:reservationId", cancelReservation);

export default router;
