import { client } from "../../config/database.js";

const shopCollection = client.db("medicineSelling").collection("shop");

const getAllShopItems = async () => {
  // const  id = req.params.id;
  const query = {};
  // console.log(query);

  const result = await shopCollection.find(query).toArray();
  // console.log(result);
  return result;
};

const getSellerItems = async (email) => {
  // console.log(email);
  const query = { sellerEmail: email };
  // console.log(query);

  const result = await shopCollection.find(query).toArray();
  // console.log(result);
  return result;
};

const addShopItem = async (data) => {
  // console.log(data);
  const result = await shopCollection.insertOne(data);
  return result;
};

export const shopService = {
  getAllShopItems,
  getSellerItems,
  addShopItem,
};

