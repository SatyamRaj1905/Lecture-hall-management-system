import { Router } from "express";
import { getTimetable, getPendingSchedules, makeBooking, updateBooking, deleteBooking, approveBooking, rejectBooking, getSchedule } from "../controllers/BookingController.js";
import { isSuper, isAuthenticated, isSuperAdmin, isOwnerOf } from "../controllers/UserController.js";

const router = Router();

router.post("/", getTimetable);

router.get("/pending", isSuper, getPendingSchedules);

router.post("/book", isAuthenticated, makeBooking);

router.post("/bookI", isSuperAdmin, makeBooking);

router.put("/update", isSuperAdmin, updateBooking);

router.delete("/del", isSuperAdmin, deleteBooking);

router.delete("/delU", isAuthenticated, isOwnerOf, deleteBooking);

router.post("/accept", isSuper, approveBooking);

router.delete("/reject", isSuper, rejectBooking);

router.post("/details", isAuthenticated, getSchedule);

export default router;
 