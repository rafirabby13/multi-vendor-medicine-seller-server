import { categoryService } from "./category.service.js";

const getMedicineCategoriesAdmin = async (req, res) => {
  const result = await categoryService.getMedicineCategoriesAdmin();
  res.send(result);
};

const getAllMedicineCategories = async (req, res) => {
  const result = await categoryService.getAllMedicineCategories();
  res.send(result);
};

const getMedicineCategoryById = async (req, res) => {
  const id = req.params.id;
  const result = await categoryService.getMedicineCategoryById(id);
  res.send(result);
};

const updateCategory = async (req, res) => {
  const updatedData = req.body;
  const result = await categoryService.updateCategory(updatedData);
  res.send(result);
};

const addCategory = async (req, res) => {
  const updatedData = req.body;
  const result = await categoryService.addCategory(updatedData);
  res.send(result);
};

const deleteCategory = async (req, res) => {
  const id = req.params.id;
  const result = await categoryService.deleteCategory(id);
  res.send(result);
};

export const categoryController = {
  getMedicineCategoriesAdmin,
  getAllMedicineCategories,
  getMedicineCategoryById,
  updateCategory,
  addCategory,
  deleteCategory,
};
