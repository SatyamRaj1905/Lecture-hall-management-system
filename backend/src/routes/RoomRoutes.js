import { Router } from "express";
import { getRoom, addRoom } from "../controllers/RoomController.js";
import { isSuper } from "../controllers/UserController.js";

const router = Router();

router.get("/", getRoom);

router.post("/addRoom", isSuper, addRoom);

export default router;
