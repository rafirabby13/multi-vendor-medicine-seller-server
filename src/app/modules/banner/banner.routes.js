import express from "express"
import { verifyAdmin, verifyToken } from "../../middlewares/auth.js";
import { bannerController } from "./banner.controller.js";

const router = express.Router();

router.post("/", verifyToken, bannerController.createBanner);
router.get("/", verifyToken, verifyAdmin, bannerController.getAllBanners);
router.patch("/:id", bannerController.toggleBannerStatus);
router.get("/active", bannerController.getActiveBanners);

export const bannerRoutes = router;