import express from 'express'
import { verifySeller, verifyToken } from '../../middlewares/auth.js';
import { shopController } from './shop.controller.js';
const router = express.Router();

router.get("/", shopController.getAllShopItems);
router.get("/seller", verifyToken, verifySeller, shopController.getSellerItems);
router.post("/addItem", verifyToken, shopController.addShopItem);

export const shopRoutes = router;