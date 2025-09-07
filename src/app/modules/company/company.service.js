import { client } from "../../config/database.js";

const companyCollection = client.db("medicineSelling").collection("company");

const getAllCompanies = async () => {
  // const  id = req.params.id;
  const query = {};
  // console.log(query);

  const result = await companyCollection.find(query).toArray();
  // console.log(result);
  return result;
};

export const companyService = {
  getAllCompanies,
};