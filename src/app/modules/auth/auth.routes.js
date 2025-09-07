import express from "express";
import { authController } from "./auth.controller.js";

const router = express.Router();

router.post("/jwt", authController.createToken);

export const authRoutes = router;
