import express from "express"
import { verifyAdmin, verifyToken } from "../../middlewares/auth.js";
import { categoryController } from "./category.controller.js";
const router = express.Router();

router.get("/medicine-category", verifyToken, verifyAdmin, categoryController.getMedicineCategoriesAdmin);
router.get("/medicine-all-category", categoryController.getAllMedicineCategories);
router.get("/medicine-category/:id", verifyToken, verifyAdmin, categoryController.getMedicineCategoryById);
router.post("/update", verifyToken, verifyAdmin, categoryController.updateCategory);
router.post("/add", verifyToken, verifyAdmin, categoryController.addCategory);
router.delete("/:id", verifyToken, verifyAdmin, categoryController.deleteCategory);

export const categoryRoutes = router;