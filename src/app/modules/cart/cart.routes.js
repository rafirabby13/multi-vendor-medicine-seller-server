
import express from "express"
import { cartController } from "./cart.controller.js";
const router = express.Router();

router.post("/", cartController.addToCart);
router.get("/", cartController.getCart);
router.patch("/inc/:id", cartController.incrementQuantity);
router.patch("/dec/:id", cartController.decrementQuantity);
router.delete("/:id", cartController.removeFromCart);
router.post("/clearCart", cartController.clearCart);



export const cartRoutes = router;