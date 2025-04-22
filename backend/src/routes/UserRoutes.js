import { Router } from "express";
import { isSuper, register, authenticate, deleteUser } from "../controllers/UserController.js";

const router = Router();

router.post("/register", isSuper, register);

router.post("/login", authenticate);

router.delete("/delete", isSuper, deleteUser);

export default router;
