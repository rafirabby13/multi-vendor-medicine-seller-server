import { ObjectId } from "mongodb";
import { client } from "../../config/database.js";

const medicineCategoryCollection = client.db("medicineSelling").collection("category");

const getMedicineCategoriesAdmin = async () => {
  // console.log(req.decoded.email);
  const query = {};
  // console.log(query);

  const result = await medicineCategoryCollection.find(query).toArray();
  // console.log(result);
  return result;
};

const getAllMedicineCategories = async () => {
  // console.log(req.decoded.email);
  const query = {};
  // console.log(query);a

  const result = await medicineCategoryCollection.find(query).toArray();
  // console.log(result);
  return result;
};

const getMedicineCategoryById = async (id) => {
  const query = { _id: new ObjectId(id) };
  // console.log(query);

  const result = await medicineCategoryCollection.findOne(query);
  // console.log(result);
  return result;
};

const updateCategory = async (updatedData) => {
  // console.log(updatedData);

  const query = { _id: new ObjectId(updatedData.id) };
  const options = { upsert: true };
  const updateDoc = {
    $set: {
      name: updatedData.name,
      image: updatedData.image,
    },
  };
  const result = await medicineCategoryCollection.updateOne(
    query,
    updateDoc,
    options
  );
  // console.log(result);
  return result;
};

const addCategory = async (updatedData) => {
  const result = await medicineCategoryCollection.insertOne(updatedData);
  return result;
};

const deleteCategory = async (id) => {
  const query = { _id: new ObjectId(id) };
  const result = await medicineCategoryCollection.deleteOne(query);
  return result;
};

export const categoryService = {
  getMedicineCategoriesAdmin,
  getAllMedicineCategories,
  getMedicineCategoryById,
  updateCategory,
  addCategory,
  deleteCategory,
};