import express from "express"
import { userController } from "./user.controller.js";
import { verifyAdmin, verifyToken } from "../../middlewares/auth.js";
const router = express.Router();

router.post("/", userController.createUser);
router.get("/", verifyToken, verifyAdmin, userController.getAllUsers);
router.get("/role", verifyToken, userController.getUserRole);
router.get("/myPayment", verifyToken, userController.getMyPayments);
router.post("/role/:id", verifyToken, verifyAdmin, userController.updateUserRole);

export const userRoutes = router;